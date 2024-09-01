import axios from "axios";

interface Register {
  student_id: string;
  equipment_id: string;
  date: string;
  entry_time: string;
  departure_time: string | null;
  comment: string | null;
}

const API_URL = 'https://udi-server.vercel.app/api';
//const API_URL = 'http://localhost:3001/api';

export const getRegisters = async () => {
  return await axios.get(`${API_URL}/registers`);
};

export const getRegisterId = async (student_id: string, register_id:string) => {
  return await axios.get(`${API_URL}/registers/${student_id}/${register_id}`);
};

export const createRegister = async (register: Register) => {
  return await axios.post(`${API_URL}/registers`, register);
};

export const updateRegister = async (student_id: string, register_id:string , register: Register) => {
  return await axios.put(`${API_URL}/registers/${student_id}/${register_id}`, register);
};

export const deleteRegister = async (student_id: string, register_id:string ) => {
  return await axios.delete(`${API_URL}/registers/${student_id}/${register_id}`);
};

export const deleteAllRegisters = async () => {
  return await axios.delete(`${API_URL}/registers`);
}