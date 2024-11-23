import React, { useEffect, useState } from 'react';
import PatientCard from './PatientCard';
import { Grid, CircularProgress, Container, Typography, CardContent, Card} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../services/api';


function PatientListPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  // Загружаем данные пациентов из JSON-файла
  useEffect(() => {  

    const fetchData = async () => {
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/'); // Перенаправляем на главную, если токен отсутствует
        return;
      }
      
      try {
        const patientsData = await getPatients(token);
  
        setPatients(patientsData);
        setLoading(false);
  
        console.log(patientsData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = () => {
    navigate('/add-patient'); 
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Список пациентов
      </Typography>      
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
          {loading ? (
            <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '50px' }} />
          ) : (            
              patients.map((patient) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>              
                  <PatientCard patient={patient}/>              
              </Grid>
            ))
          )}
        </Grid>          
    </Container>
  );
}

export default PatientListPage;