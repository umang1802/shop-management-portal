import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authentication/AuthContext';

const LoginScreen = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { getRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_MICROSERVICE_URL+'api/users/login', { name, password });
      if (response.data.rows.length > 0) {
        localStorage.setItem('user',JSON.stringify(response.data.rows[0]));
        getRole();
        navigate('/');
      } else {
        alert('Enter a valid username and password');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={name}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
