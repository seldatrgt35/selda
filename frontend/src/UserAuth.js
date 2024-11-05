import React, { useState } from 'react';

const UserAuth = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('viewer');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    // Geçici kullanıcı bilgileri
    const TEMP_USERS = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'viewer' }
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = TEMP_USERS.find(
            user => user.username === username && user.password === password
        );

        if (foundUser) {
            setErrorMessage('Giriş başarılı!');
            onLoginSuccess(foundUser.role);
        } else {
            setErrorMessage('Kullanıcı adı veya şifre hatalı.');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Kullanıcı Girişi' : 'Kullanıcı Kayıt'}</h2>
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
                <button type="submit">{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</button>
            </form>

            <p>
                {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
            </p>

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default UserAuth;
