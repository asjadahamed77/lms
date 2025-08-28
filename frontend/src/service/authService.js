import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const login = async (email, password) => {
    try {
        const {data} = await axios.post('/auth/login', {email, password}, {withCredentials: true});
         // Store token and user data
         localStorage.setItem('token', data.token);        
         localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export const logout = async () => {
    try {
        const {data} = await axios.post('/auth/logout', {}, {withCredentials: true});
        // Clear token and user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}