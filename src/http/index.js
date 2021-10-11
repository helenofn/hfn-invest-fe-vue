import axios from 'axios';
import { store } from '@/store'

const http = axios.create({
    baseURL: 'http://localhost:8081/',
    headers:{
        'Accept': 'application/json',
        'Content': 'application/json'
    }
});

http.interceptors.request.use(
    function(config){
        const token = store.state.token;
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    function(response){
        //console.log("Response: "+response);
        return response;
    },
    function(error){
        const erro = {
            error,
            msgErro:'Ocorreu um imprevisto. Favor tentar mais tarde.'
        }
        if(error&&error.response&&error.response.data){
            if(error.response.data.showMessage){
                erro.msgErro = error.response.data.dsBusinessErroMessage
            }
        }
        return Promise.reject(erro);
    }
);

export default http;