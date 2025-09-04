import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token');



//  Create Quiz
export const createQuiz = async (formData) => {
    try {
        const { data } = await axios.post(
            '/quiz/add-quiz',
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
        console.error("Create Quiz Error:", error);
        throw error;
    }
};

//  Get Lecturer Quizzes
export const getLecturerQuizzes = async (lecturerId) => {
    try {
        const { data } = await axios.get(
          `/quiz/lecturer-quizzes/${lecturerId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        
        return data;
    } catch (error) {
        console.error("Get Lecturer Quizzes Error:", error);
        throw error;
    }
};

// delete quiz
export const deleteQuiz = async (quizId) => {
    try {
        const { data } = await axios.delete(
          `/quiz/lecturer-quizzes/${quizId}`,
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

