
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')

export const createAnnouncement = async (formData) => {
    try {
        const {data} = await axios.post('/announcements/create', formData, {
            headers: {
                   'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        return data;
    } catch (error) {
        console.log("Error creating announcement:", error);
        throw error;
        
    }
}

export const getAllAnnouncements = async () => {
    try {
        const {data} = await axios.get('/announcements/all', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return data;
    } catch (error) {
        console.log("Error fetching announcements:", error);
        throw error;
    }
}

export const deleteAnnouncement = async (announcementId) => {
    try {
        const {data} = await axios.delete(`/announcements/delete/${announcementId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return data;
    } catch (error) {
        console.log("Error delete announcement:", error);
        throw error;
    }
}