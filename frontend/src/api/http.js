import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'

const http = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
})

export default http;

// set auth header from stored token if present
try {
  const token = localStorage.getItem('sp_token');
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
} catch (e) {}
