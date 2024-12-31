import axios from 'axios'
import { getUserToken, logOutUser } from "./auth";

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

let fileHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'token': localStorage.getItem('authToken'),
};

const Endpoint = {
    init: () => {
        let token = getUserToken();
        if (token)
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;

        //axios.defaults.baseURL = "http://10.211.55.4/api";
        axios.defaults.baseURL = "https://backend-kreatoors.kobokistltd.com/api";
        

        axios.interceptors.response.use(response => response, (error) => {
            if (!error.response) {
            } else if (error.response && error.response.status === 401 && error.response.config.url !== '/') {
                logOutUser();
            }

            return Promise.reject(error.response);
        });
    },

    login: (data) => {
        return axios.post(`/Account/UserLogin`, data, headers)
    },

    signup: (data) => {
        return axios.post(`/Account/CreateAccount`, data, headers)
    },

    activateAccount: (data) => {
        return axios.get(`/Account/VerifyEmail?token=${data}`, headers)
    },

    getUserDetails: () => {
        return axios.get(`/Account/FetchUserDetails`, headers)
    },

    updateUserProfile: (data) => {
        return axios.post(`/Account/UpdateProfile`, data, headers)
    },
    getMyDevices: () => {
        return axios.get(`/Account/FetchMyDevices`, headers)
    },
    logOutDevice: (deviceId) => {
        return axios.post(`/Account/LogoutDevice?deviceId=${deviceId}`, headers)
    },
    deleteDevice: (deviceId) => {
        return axios.post(`/Account/RemoveDevice?deviceId=${deviceId}`, headers)
    },

};

export default Endpoint