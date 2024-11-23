import React, { useEffect, useState } from 'react';
import PatientCard from './PatientCard';
import { Grid, CircularProgress, Container, Typography, CardContent, Card} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../services/api';


function PatientListPage() {
  const token = localStorage.getItem('token');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  // Загружаем данные пациентов из JSON-файла
  useEffect(async () => {
    if(!token){
      navigate('/');
    }
    const patientsData = await getPatients(token);
    setPatients(patientsData);
    setLoading(false);
  }, []);

  const handleClickOpen = () => {
    navigate('/register-patient'); 
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Список пациентов
      </Typography>
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />
      ) : (
        <Grid container spacing={3} justifyContent="center" sx={{ padding: 3 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}> 
            <Card
                sx={{
                  maxWidth: 360, 
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: '0.3s ease',
                  '&:hover': {
                    backgroundColor: '#4BB543',
                    boxShadow: 6,
                },
              }}
              
            >   
              <CardContent onClick={handleClickOpen}>
                <Typography variant="h6" component="div" align="center">
                  Добавить нового пользователя
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {patients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={patient.email}>              
                <PatientCard patient={patient}/>              
            </Grid>
          ))}
        </Grid>
      )}      
    </Container>
  );
}

export default PatientListPage;