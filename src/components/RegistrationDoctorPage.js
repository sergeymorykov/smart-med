import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../services/api';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const RegistrationDoctorPage = () => {
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
    }

    try {
      await registerDoctor(email, surname + " " + name, birthDate, specialization, password);
      navigate('/');
    } catch (error) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Typography  variant="h4">Регистрация</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
        />
        <TextField
          label="Фамилия"
          variant="outlined"
          fullWidth
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          margin='normal'
        />
        <TextField
          label="Имя"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin='normal'
        />             
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Дата рождения"
            inputFormat="MM/dd/yyyy"
            value={birthDate}
            onChange={(newDate) => { setBirthDate(newDate) }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <TextField
          id="specialization"
          label="Специализация"
          variant="outlined"
          fullWidth
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          margin='normal' 
        />
        <TextField
          label="Пароль"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin='normal'          
        />
        <TextField
          label="Подтвердите пароль"
          variant="outlined"
          fullWidth              
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Зарегистрироваться
        </Button>       
      </form>
    </Container>
  );
};

export default RegistrationDoctorPage;