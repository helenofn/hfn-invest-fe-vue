import Http from '@/http'
import { createPageUrlParameters } from '@/util/pageUtil.js'

export const create = (financialAssetCategory) => {
    let obj = Object.assign({}, financialAssetCategory);
    return Http.post('financialAssetCategory', obj);
};

export const getAllPage = (options, pFiltro) => {
    
    let urlParameters = createPageUrlParameters(options);

    let filtro = Object.assign({}, pFiltro);
    return Http.post('financialAssetCategory/page' + urlParameters, filtro);
}

