import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatient, getAnalysis } from '../services/api';

const patientsData = [
    { email: "emily.davis@example.com", pulse: 75, respiratory_rate: 16, oxygen_saturation: 98, systolic_blood_pressure: 120, diastolic_blood_pressure: 80, heart_rate: 72, analysis_timestamp: "2024-11-01T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 78, respiratory_rate: 17, oxygen_saturation: 97, systolic_blood_pressure: 122, diastolic_blood_pressure: 81, heart_rate: 74, analysis_timestamp: "2024-11-02T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 77, respiratory_rate: 16, oxygen_saturation: 99, systolic_blood_pressure: 119, diastolic_blood_pressure: 79, heart_rate: 70, analysis_timestamp: "2024-11-03T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 80, respiratory_rate: 18, oxygen_saturation: 96, systolic_blood_pressure: 125, diastolic_blood_pressure: 82, heart_rate: 76, analysis_timestamp: "2024-11-04T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 82, respiratory_rate: 17, oxygen_saturation: 97, systolic_blood_pressure: 128, diastolic_blood_pressure: 83, heart_rate: 78, analysis_timestamp: "2024-11-05T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 79, respiratory_rate: 15, oxygen_saturation: 98, systolic_blood_pressure: 123, diastolic_blood_pressure: 80, heart_rate: 73, analysis_timestamp: "2024-11-06T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 85, respiratory_rate: 19, oxygen_saturation: 95, systolic_blood_pressure: 130, diastolic_blood_pressure: 85, heart_rate: 80, analysis_timestamp: "2024-11-07T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 74, respiratory_rate: 16, oxygen_saturation: 99, systolic_blood_pressure: 118, diastolic_blood_pressure: 77, heart_rate: 71, analysis_timestamp: "2024-11-08T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 83, respiratory_rate: 18, oxygen_saturation: 96, systolic_blood_pressure: 127, diastolic_blood_pressure: 84, heart_rate: 79, analysis_timestamp: "2024-11-09T08:00:00Z" },
    { email: "emily.davis@example.com", pulse: 76, respiratory_rate: 17, oxygen_saturation: 98, systolic_blood_pressure: 121, diastolic_blood_pressure: 78, heart_rate: 75, analysis_timestamp: "2024-11-10T08:00:00Z" }
  ];

const PatientDetail = ({ id }) => {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({});
  const [analysis, setAnalysis] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('analysis_timestamp'); // По умолчанию сортируем по пульсу

  useEffect(async () => {
    const token = localStorage.getItem('token');

    if(!token){
      navigate('/');
    }
    const patientsData = await getPatient(token, id);

    const analysisData = await getAnalysis(token, id);

    setPatient(patientsData);
    setAnalysis(analysisData);

  }, []);

  // Функция для обработки сортировки
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Функция для сортировки данных
  const sortData = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  // Функция для сравнения значений для сортировки
  const comparator = (a, b) => {
    if (orderBy === 'pulse') {
        return order === 'asc' ? a.pulse - b.pulse : b.pulse - a.pulse;
      }
      if (orderBy === 'analysis_timestamp') {
        const dateA = new Date(a.analysis_timestamp);
        const dateB = new Date(b.analysis_timestamp);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }
    // Добавить другие условия для сортировки по другим столбцам
    return 0;
  };

  // Отсортированные данные
  const sortedData = sortData(analysis, comparator);



  if (!patient) {
    return <Typography variant="h6">Пациент не найден</Typography>;
  }

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h4">{patient.fullname}</Typography>
      <Typography variant="body1">Дата рождения: {patient.date_of_birth}</Typography>
      <Typography variant="body1">Пол: {patient.gender}</Typography>
      <Typography variant="body1">Адрес: {patient.address}</Typography>
      <Typography variant="body1">Телефон: {patient.phone_number}</Typography>
      <Typography variant="body1">Email: {patient.email}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                    sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}
                    active={orderBy === 'analysis_timestamp'}
                    direction={orderBy === 'analysis_timestamp' ? order : 'asc'}
                    onClick={() => handleRequestSort('analysis_timestamp')}
                >
                    Дата анализа
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Пульс</TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Частота дыхания</TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Насыщение кислородом (%)</TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Систолическое давление (мм рт. ст.)</TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Диастолическое давление (мм рт. ст.)</TableCell>
              <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Частота сердечных сокращений</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((data, index) => (
              <TableRow key={index}
                sx={{
                    backgroundColor: index % 2 !== 0 ? '#f4f4f4' : 'transparent' // Покрасить нечетные строки
                }}
              >
                <TableCell>{new Date(data.analysis_timestamp).toLocaleDateString()}</TableCell>
                <TableCell>{data.pulse}</TableCell>
                <TableCell>{data.respiratory_rate}</TableCell>
                <TableCell>{data.oxygen_saturation}</TableCell>
                <TableCell>{data.systolic_blood_pressure}</TableCell>
                <TableCell>{data.diastolic_blood_pressure}</TableCell>
                <TableCell>{data.heart_rate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientDetail;