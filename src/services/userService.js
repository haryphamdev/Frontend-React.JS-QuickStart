import axios from "../axios";


const handleLoginApi = (userEmail, userPassword)=>{
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

export { handleLoginApi, getAllUsers }
