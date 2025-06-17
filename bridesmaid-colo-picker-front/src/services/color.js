import axios from 'axios';

const API_URL = import.meta.env.BASE_URL || 'http://localhost:3005'

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000
})

const getAvailableColors = async () => {
    const colors = await instance.get('/colors', {params: {"available": true}})
    console.log(`These are colors: ${colors.data}`)
    return colors.data;
}

export default getAvailableColors;