import axios from 'axios';
import axiosInstance from './axiosInstance';
const BASE_URL = 'http://localhost:8080/api';

export const login = async ({ email, password }) => {
  console.log('login', email, password);
  try {
    const response = await axiosInstance.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    console.log('login response', response);
    return response;
  } catch (error) {
    console.log('login error1', error);
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/${url}`, data);
    return response;
  } catch (error) {
    console.log('Post API Error', error);
  }
};

export const getData = async (url) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${url}`);
    return response;
  } catch (error) {
    if (error.message === 'Network Error')
      window.location.href = '/network-error';
    return { data: [] };
  }
};

export const deleteData = async (url) => {
  const response = await axios.delete(`${BASE_URL}/${url}`);
  return response;
};

export const updateData = async (url, data) => {
  const response = await axios.put(`${BASE_URL}/${url}`, data);
  return response;
};
