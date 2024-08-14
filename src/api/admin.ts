import axios from 'axios';

interface Admin {
  username: string;
  password: string;
}

//const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://udi-server-238vucyx8-daves-projects-2ad59da7.vercel.app/api';


export const loginAdmin = async (admin: Admin) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: admin.username,
      password: admin.password,
    });
    return response.data; // Puedes manejar la respuesta aquí
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      return { error: "Credenciales incorrectas" }; // Devuelve un mensaje de error personalizado
    } else {
      throw error; // Si es otro tipo de error, lánzalo para que sea manejado en otro lugar
    }

  }
};
