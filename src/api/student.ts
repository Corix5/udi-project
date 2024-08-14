import axios from 'axios';

interface Student {
  name: string;
  id_number: string;
  email: string;
}

const API_URL = 'https://udi-server-238vucyx8-daves-projects-2ad59da7.vercel.app/api';
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

