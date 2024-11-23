import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginDoctor(username, password);
      setError(token);
      localStorage.setItem('token', token);
      navigate('/patient-list');
    } catch (error) {
      //setError('Ошибка авторизации');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Typography  variant="h4">Авторизация</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Имя пользователя"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Пароль"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Войти
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate('/register-doctor')}
          fullWidth
          sx={{ mt: 2 }}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
