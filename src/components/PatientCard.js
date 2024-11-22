import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PatientCard({ patient }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/patient/${patient.email}`); 
  };
  return (
    
      <Card
        sx={{
          maxWidth: 360, 
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          cursor: 'pointer',
          transition: '0.3s ease',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            boxShadow: 6,
        },
      }}
      
      >        
        <CardContent onClick={handleCardClick}>
          <Typography variant="h6" component="div" align="center">
            {patient.fullname}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Email: {patient.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            Номер: {patient.phone_number}
          </Typography>
        </CardContent>
      </Card>
    
  );
}

export default PatientCard;