import Http from '@/http';
import { createPageUrlParameters } from '@/util/pageUtil.js';

export const getAllPage = (options, pFiltro) => {
    
    let urlParameters = createPageUrlParameters(options);
    let filtro = Object.assign({}, pFiltro);
    return Http.post('broker/page' + urlParameters, filtro);
}