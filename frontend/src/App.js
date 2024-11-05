import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAuth from './UserAuth';
import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('viewer');
  const [users, setUsers] = useState([]);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const handleAddUser = async (username, password, role) => {
    try {
      const response = await fetch('http://localhost:3000/api-routes/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Kullanıcı ekleme hatası:', errorData);
        return;
      }

      const newUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, newUser]);
      console.log('Kullanıcı başarıyla eklendi:', newUser);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole('viewer');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ?
            <Dashboard
              role={role}
              handleAddUser={handleAddUser}
              users={users}
              setUsers={setUsers}
              handleLogout={handleLogout}
            /> : <UserAuth onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
          {/* Diğer rotalar */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
