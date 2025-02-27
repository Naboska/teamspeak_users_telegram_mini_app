import axios from 'axios';

const createApiClient = () => {
  const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  http.interceptors.request.use(r => r);

  http.interceptors.response.use(r => r);

  return http;
};

export const apiClient = createApiClient();
