
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')



// create lecturer 
export const createLecturer = async (formData) => {
    try {
        const {data} = await axios.post('/admin-lecturers/create-lecturer', formData, {
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

// get all lecturer
export const getAllLecturers = async () => {
    try {
        const {data} = await axios.get('/admin-lecturers/get-lecturer', {
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
