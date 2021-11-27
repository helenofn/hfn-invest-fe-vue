export const createPageUrlParameters = (options) =>{

    let direction = 'ASC';
    let orderBy = '';
    let page = options?.page -1;

    if(options?.sortBy[0]){
        orderBy = options?.sortBy[0];
    }

    if(options?.sortDesc[0]){
        direction = 'DESC';
    }

    let urlParameters = '';
    urlParameters = urlParameters + '?page='+page;
    urlParameters = urlParameters + '&linesPerPage='+options?.itemsPerPage;
    urlParameters = urlParameters + '&direction='+direction;
    urlParameters = urlParameters + '&orderBy='+orderBy;

    return urlParameters;
}