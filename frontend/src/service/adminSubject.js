import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')



// create subject
export const createSubject = async (formData) => {
    try {
        const {data} = await axios.post('/admin-subjects/create-subject', formData, {
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

// get all subjects
export const getAllSubjects = async () => {
    try {
        const {data} = await axios.get('/admin-subjects/get-subjects', {
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


// Delete Subject
export const deleteSubject = async (id) => {
    try {
        const {data} = await axios.delete(`/admin-subjects/${id}`, {
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