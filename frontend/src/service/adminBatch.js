import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')



// create batch
export const createBatch = async (formData) => {
    try {
        const {data} = await axios.post('/admin-batch/create-batch', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}