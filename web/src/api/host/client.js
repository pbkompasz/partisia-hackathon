import axios from "axios";

const URL = 'http://localhost:3000';

const axiosClient = axios.create({
  baseURL: URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    const token = getCookie('jwt_token');
    console.log(token);

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export {
  axiosClient,
}
