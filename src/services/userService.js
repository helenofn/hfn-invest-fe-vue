import Http from '@/http'

export const create = (usuario) => {
    return Http.post('auth/signIn', usuario);
};

export const update = (usuario) => {
    return Http.update('user', usuario);
}

export const getAll = () => {
    return Http.get('user');
}
