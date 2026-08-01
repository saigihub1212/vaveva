import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'https://7z9zjkqwo7.execute-api.ap-south-1.amazonaws.com/dev/api'
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vaveva_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminApi;
