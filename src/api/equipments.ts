import axios from 'axios';

const API_URL = 'http://192.168.100.207:3001/api';
//const API_URL = 'https://10.3.56.38/api';

export const getEquipments = async() => {
    return await axios.get(`${API_URL}/equipments`)
}