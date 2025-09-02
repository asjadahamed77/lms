import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem('token')
console.log(token);




// // get student
// export const getStudent = async (userId) => {
//     try {
//       const { data } = await axios.get(`/student/${userId}/get-student`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };