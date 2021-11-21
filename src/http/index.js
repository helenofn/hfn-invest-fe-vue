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
        store.dispatch('addRequestSend');
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
        store.dispatch('removeRequestSend');
        return response;
    },
    function(error){
        store.dispatch('removeRequestSend');
        const erro = {
            error,
            msgErro:'Ocorreu um imprevisto. Favor tentar mais tarde.'
        }
        console.log(error.response.data);
        if(error&&error.response&&error.response.data){
            erro.msgErro = error.response.data.msg + '<br/>';

            if(Array.isArray(error.response.data.errors)){
                error.response.data.errors.forEach(function(objErro) {
                    erro.msgErro = erro.msgErro + '<br/> - ' + objErro.message;
                })
            }else{
                erro.msgErro = erro.msgErro + '<br/> - ' + error.response.data.errors.message;
            }
        }
        return Promise.reject(erro);
    }
);

export default http;