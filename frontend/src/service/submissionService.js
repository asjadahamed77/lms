import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')

export const submitAssignment = async ({userId,formData}) => {
    try {
        const {data} = await axios.post(`/submission/assignment/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        return data;
    } catch (error) {
        console.error("Submit Assignment Error:", error);
        throw error;
    }
}

export const submitQuiz = async ({userId,formData}) => {
    try {
        const {data} = await axios.post(`/submission/quiz/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        return data;
    } catch (error) {
        console.error("Submit Quiz Error:", error);
        throw error;
    }
}

export const getAssignmentSubmissions = async ({userId}) => {
    try {
        const {data} = await axios.get(`/submission/assignments/${userId}`, {
            headers: {
             
                'Authorization': `Bearer ${token}`,
            },
        })
        
        
        return data;
    } catch (error) {
        console.error("Get Assignment Submissions Error:", error);
        throw error;
        
    }
} 

export const getQuizSubmissions = async ({userId}) => {
    try {
        const {data} = await axios.get(`/submission/quizzes/${userId}`, {
            headers: {
             
                'Authorization': `Bearer ${token}`,
            },
        })
        
        
        return data;
    } catch (error) {
        console.error("Get Assignment Submissions Error:", error);
        throw error;
        
    }
} 