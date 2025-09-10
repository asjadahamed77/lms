import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');

//  Create Assignment
export const createAssignment = async (formData) => {
    try {
        const { data } = await axios.post(
            '/assignment/add-assignment',
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
        console.error("Create Assignment Error:", error);
        throw error;
    }
};

//  Get Lecturer Assignments
export const getLecturerAssignments = async (lecturerId) => {
    try {
        const { data } = await axios.get(
          `/assignment/lecturer-assignments/${lecturerId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        
        return data;
    } catch (error) {
        console.error("Get Lecturer Assignments Error:", error);
        throw error;
    }
};

// delete assignment
export const deleteAssignment = async (assignmentId) => {
    try {
        const { data } = await axios.delete(
          `/assignment/lecturer-assignments/${assignmentId}`,
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


export const getUpcomingAssignmentsForStudents = async (batchName, departmentName) => {
    try {
        const { data } = await axios.get(
          `/assignment/upcoming?batchName=${encodeURIComponent(batchName)}&departmentName=${encodeURIComponent(departmentName)}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        
        console.log(data);
        
        return data;
    } catch (error) {
        console.error("Get Upcoming Assignments Error:", error);
        throw error;
    }
}
