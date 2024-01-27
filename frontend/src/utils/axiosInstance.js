import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

const authService = {
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axiosInstance.post('/refresh_token', {
        refreshToken,
      });
      const { accessToken, newRefreshToken } = response.data;

      // Update the access token and refresh token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // Retry the original API request with the new access token
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle token refresh error (e.g., logout the user)
      return false;
    }
  },
};
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log('config', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('response1', response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log('originalRequest', originalRequest);
    // Handle token expiration and retry the request with a refreshed token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const isRefreshSuccessful = await authService.refreshToken();
      if (isRefreshSuccessful) {
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
