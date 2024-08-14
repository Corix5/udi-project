import axios from 'axios';

const API_URL = 'https://udi-server-238vucyx8-daves-projects-2ad59da7.vercel.app/api';
export const getEquipments = async() => {
    return await axios.get(`${API_URL}/equipments`)
}