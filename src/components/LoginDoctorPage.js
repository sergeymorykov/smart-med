import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../services/api';
import './LoginDoctorPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginDoctor(email, password);
      setError(token);
      localStorage.setItem('token', token);
      navigate('/patient-list');
    } catch (error) {
      setError('Ошибка авторизации');
    }
  };

  return (
    <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Авторизация</h2>
                {error && <p className="login-error">{error}</p>}
                <div className="login-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите email"
                    />
                </div>
                <div className="login-field">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    />
                </div>
                <button type="submit" className="login-button">Войти</button>
            </form>
        </div>
  );
};

export default LoginPage;
