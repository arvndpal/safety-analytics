import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log('login response', response);
    return response;
  } catch (error) {
    console.log('login error1', error.response);
  }
};

export const getData = async (url) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  return response;
};

export const deleteData = async (url) => {
  const response = await axios.delete(`${BASE_URL}/${url}`);
  return response;
};

export const updateData = async (url, data) => {
  const response = await axios.put(`${BASE_URL}/${url}`, data);
  return response;
};
