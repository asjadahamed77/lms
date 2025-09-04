import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');

//  Create Resource
export const createResource = async (formData) => {
    try {
        const { data } = await axios.post(
            '/resource/add-resource',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Create Resource Error:", error);
        throw error;
    }
};

//  Get Lecturer Resources
export const getLecturerResources = async (lecturerId) => {
    try {
        const { data } = await axios.get(
          `/resource/lecturer-resources/${lecturerId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        
        return data;
    } catch (error) {
        console.error("Get Lecturer Resources Error:", error);
        throw error;
    }
};

// delete resource
export const deleteResource = async (resourceId) => {
    try {
        const { data } = await axios.delete(
          `/resource/lecturer-resources/${resourceId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        
        return data;
    } catch (error) {
        console.error("Delete Assignment Error:", error);
        throw error;
    }
}
