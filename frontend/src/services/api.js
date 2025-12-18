
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

export async function sendQuery(query) {
  try {
    const res = await api.post('/api/query', { query })
    return res.data
  } catch (err) {
    // Axios error with backend response
    if (err.response && err.response.data) {
      throw new Error(err.response.data.detail || 'Request failed')
    }

    // Network / CORS / backend down
    if (err.request) {
      throw new Error('Network error: check backend or CORS configuration')
    }

    // Anything else
    throw new Error(err.message || 'Unknown error')
  }
}
