import axios from 'axios';

const API_URL = 'https://mockapi.example.com'; // Ваш API сервер

// Функция для регистрации пользователя
export const registerDoctor = async (email, fullname, gender, address, phone_number, photo, password) => {
  return axios.post(`${API_URL}/register`, { email, fullname, gender, address, phone_number, photo, password });
};

// Функция для авторизации пользователя
export const loginDoctor = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Возвращает объект с JWT токеном
};

export const addPatient = async (token, email, fullname, gender, address, phone_number) => {
  const response = await axios.post(`${API_URL}/patient`, {email, fullname, gender, address, phone_number}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Функция для получения состояния пациента (пример)
export const getPatientStatus = async (token) => {
  const response = await axios.get(`${API_URL}/patient/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};