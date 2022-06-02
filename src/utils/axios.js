import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:4444/',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("@jwt")
    },
    // withCredentials: trues
});

// Api.interceptors.response.use(
//     function (response) {
//         return response;
//     },
//     function (error) {
//         if (error.response.status === 401 && error.response.data.error !== "Senha inválida" && error.response.data !== "Funcionário já em uso em outro dispositivo") {
//             localStorage.setItem("isAuthenticated", false);
//             window.location.href = "/login";
//         }
//         console.warn(error.response);
//         return Promise.reject(error);
//     }
// )

export default Axios;