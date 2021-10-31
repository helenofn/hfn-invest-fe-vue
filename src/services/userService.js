import Http from '@/http'
import { userStatusDto } from '@/dto/userStatusDto.js'

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
    let direction = 'ASC';
    let orderBy = '';
    let page = options?.page -1;

    if(options?.sortBy[0]){
        orderBy = options?.sortBy[0];
    }

    if(options?.sortDesc[0]){
        direction = 'DESC';
    }

    let c_options = '';
    c_options = c_options + '?page='+page;
    c_options = c_options + '&linesPerPage='+options?.itemsPerPage;
    c_options = c_options + '&direction='+direction;
    c_options = c_options + '&orderBy='+orderBy;
    
    if(!pFiltro?.status){
        pFiltro.status = userStatusDto;
    }

    let filtro = Object.assign({}, pFiltro);
    //exemplo: ?linesPerPage=2&page=0&direction=ASC&orderBy=name
    return Http.post('user/page' + c_options, filtro);
}
