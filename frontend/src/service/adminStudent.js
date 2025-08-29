
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')



// create student 
export const createStudent = async (formData) => {
    try {
        const {data} = await axios.post('/admin-students/create-student', formData, {
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

// get all students
export const getAllStudents = async () => {
    try {
        const {data} = await axios.get('/admin-students/get-students', {
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
