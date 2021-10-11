import Http from '@/http'

export const statusUserListAll = () => {
    return Http.get('dominio/userStatusListAll');
};
