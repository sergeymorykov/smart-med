import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box,
   FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
 } from '@mui/material';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { addPatient } from '../services/api';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const RegistrationPatientPage = () => {
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  useEffect(() => {

    if (!token) {
      navigate('/');
      return;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {     
  
      try {

        await addPatient(token, email, surname + " " + name, birthDate, gender, address, phone_number);
        navigate('/patient-list'); 

      } catch (error) {
        setError('Ошибка регистрации');
      }
    };
    fetchData();
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <Typography  variant="h4">Добавить пациента</Typography>
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
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DesktopDatePicker
            label="Дата рождения"
            inputFormat="MM/dd/yyyy"
            value={birthDate}
            onChange={(newDate) => { setBirthDate(newDate) }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
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
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Добавить
        </Button>       
      </form>
    </Container>
  );
};

export default RegistrationPatientPage;