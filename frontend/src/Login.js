import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api-routes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Giriş başarısız!');
                return;
            }

            const data = await response.json();

            onLoginSuccess(data.role);
        } catch (error) {
            console.error('İstek sırasında hata:', error);
            setErrorMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };

    return (
        <div>
            <h2>Giriş Yap</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Hata oldu */}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
