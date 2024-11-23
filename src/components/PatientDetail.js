import React, {useState} from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatient, getAnalysis } from '../services/api';
import { useParams } from 'react-router-dom';



const PatientDetail = () => {
  const {patientId} = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('analysis_timestamp'); // По умолчанию сортируем по пульсу

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        navigate('/'); // Перенаправляем на главную, если токен отсутствует
        return;
      }
  
      try {
        const patientsData = await getPatient(token, patientId);
        const analysisData = await getAnalysis(token, patientId);
  
        setPatient(patientsData);
        setAnalysis(analysisData);
  
        console.log(patientsData);
        console.log(analysisData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
  const sortedData = analysis ? sortData(analysis, comparator) : [];


  

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