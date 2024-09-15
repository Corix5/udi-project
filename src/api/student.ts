import axios from 'axios';

interface Student {
  name: string;
  id_number: string;
  email: string;
}

const API_URL = 'https://udi-server.vercel.app/api';
//const API_URL = 'https://10.3.56.38/api';

export const getStudents = async () => {
  return await axios.get(`${API_URL}/students`);
};

export const getStudentById = async (id:string) => {
  return await axios.get(`${API_URL}/students/${id}`);
};

export const createStudent = async (student: Student) => {
  return await axios.post(`${API_URL}/students`, student);
};

export const updateStudent = async (id:string, student:Student) => {
  return await axios.put(`${API_URL}/students/${id}`, student);
};

export const deleteStudent = async (id:string) => {
  return await axios.delete(`${API_URL}/students/${id}`);
};

