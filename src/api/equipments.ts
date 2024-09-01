import axios from 'axios';

const API_URL = 'https://udi-server.vercel.app/api';
//const API_URL = 'http://localhost:3001/api';

export const getEquipments = async() => {
    return await axios.get(`${API_URL}/equipments`)
}