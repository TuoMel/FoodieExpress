import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


export const register = async (first_name, last_name, email, phone, password) => {
    try {
        const result = await api.post('/auth/register', {
            first_name,
            last_name,
            email,
            phone,
            password
        });

        return result.data;
    } catch (error) {
        throw new Error(error);
    }
}