import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ваш API сервер

// Функция для регистрации пользователя
export const registerDoctor = async (email, fullname, date_of_birth, specialization, password) => {
  console.log({ email, fullname, date_of_birth, specialization, password});
  const response = await axios.post(`${API_URL}/auth/sign-up`, { email, fullname, date_of_birth, specialization, password});
  return response.data;
};

// Функция для авторизации пользователя
export const loginDoctor = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, { email, password });
  return response.data; // Возвращает объект с JWT токеном
};

export const addPatient = async (token, email, fullname, gender, address, phone_number) => {
  console.log({email, fullname, gender, address, phone_number});
  const response = await axios.post(`${API_URL}/api/patients`, {email, fullname, gender, address, phone_number}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPatients = async (token) => {
  const response = await axios.get(`${API_URL}/api/patients`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPatient = async (token, id) => {
  const response = await axios.get(`${API_URL}/api/patients/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAnalysis = async (token, id) => {
  const response = await axios.get(`${API_URL}/api/patients/${id}/analysis`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};