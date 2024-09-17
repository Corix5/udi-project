import axios from 'axios';

interface Admin {
  username: string;
  password: string;
}

//const API_URL = 'https://udi-server.vercel.app/api';
//const API_URL = 'https://10.3.56.38/api';
const API_URL = 'http://192.168.100.207:3001/api';
export const loginAdmin = async (admin: Admin) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: admin.username,
      password: admin.password,
    });
    
    const token = response.data.token;

    localStorage.setItem('adminToken', token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      return { error: "Credenciales incorrectas" };
    } else {
      throw error;
    }
  }
};


export const getAdminInfo = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/admin-info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    
    return response.data;
  } catch (error) {
    console.error("Error en getAdminInfo:", error); // Verifica el error si ocurre
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      return { error: "Acceso denegado. Por favor, inicia sesión." };
    } 
    throw error;
  }
};



