import Http from '@/http'
import { userStatusDto } from '@/dto/userStatusDto.js'
import { createPageUrlParameters } from '@/util/pageUtil.js'

export const create = (usuario) => {
    return Http.post('auth/signUp', usuario);
};

export const update = (usuario) => {
    return Http.put('user/' + usuario.id, usuario);
}

export const getAll = () => {
    return Http.get('user');
}

export const getAllPage = (options, pFiltro) => {
    
    let urlParameters = createPageUrlParameters(options);

    if(!pFiltro?.status){
        pFiltro.status = userStatusDto;
    }

    let filtro = Object.assign({}, pFiltro);
    return Http.post('user/page' + urlParameters, filtro);
}
