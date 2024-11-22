import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Avatar, Box,
   FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
 } from '@mui/material';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { registerDoctor } from '../services/api';

const RegistrationDoctorPage = () => {
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [photo, setPhoto] = useState('');  
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
      await registerDoctor(email, surname + " " + name, gender, address, phone_number, photo, password);
      navigate('/login');
    } catch (error) {
      setError('Ошибка регистрации');
    }
  };

  const handleAvatarClick = () => {
    const fileInput = document.getElementById('avatar-input');
    fileInput.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Пожалуйста, выберите изображение');
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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Центрирование по горизонтали
                alignItems: 'center', // Центрирование по вертикали
            }}
        >
            <Avatar src={avatarUrl} onClick={handleAvatarClick} sx={{ width: 200, height: 200 }}/>
            <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            id="avatar-input"
            />
        </Box>       
        <FormControl component="fieldset" required margin='normal'>
          <FormLabel component="legend">Пол</FormLabel>
          
          <RadioGroup
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {/* Radio кнопки для выбора пола */}
            <FormControlLabel value="male" control={<Radio />} label="Мужской" />
            <FormControlLabel value="female" control={<Radio />} label="Женский" />
            <FormControlLabel value="other" control={<Radio />} label="Другой" />
          </RadioGroup>
        </FormControl> 
        <TextField
          id="address-input"
          label="Адрес"
          variant="outlined"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          margin='normal' 
        />
        <InputMask
            mask="+7 (999) 999-9999"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          >
          {(inputProps) => (
            <TextField
              {...inputProps}
              label="Телефон"
              variant="outlined"
              fullWidth
              required
              margin='normal' 
            />
          )}
        </InputMask>
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