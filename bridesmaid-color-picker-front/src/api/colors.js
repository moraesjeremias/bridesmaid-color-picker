import axios from 'axios'

const API_URL = import.meta.env.API_URL || "http://localhost:3005";

export const getAvaibleColors = async () => {
    const colors = await axios.get(`${API_URL}/colors?available=true`)
    console.debug(`These are colors: ${colors.data}`)
    return colors.data;
}
