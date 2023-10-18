import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost';
const API_PORT = process.env.API_PORT || '8080';
const API_ENDPOINT = process.env.API_ENDPOINT || 'api';

export const BASE_API_URL = `${API_URL}:${API_PORT}/${API_ENDPOINT}`;

function handleApiError(error: {
  response: { status: any; data: any };
  request: any;
  message: any;
}) {
  if (error.response) {
    console.error(
      'API Error Response:',
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    console.error('API Request Error:', error.request);
  } else {
    console.error('API Request Setup Error:', error.message);
  }

  return {
    error: true,
    message: 'An error occurred. Please try again later.',
  };
}

const apiClient = axios.create({
  baseURL: BASE_API_URL,
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;
