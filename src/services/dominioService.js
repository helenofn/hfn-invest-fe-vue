import Http from '@/http'

export const statusUserListAll = () => {
    return Http.get('dominio/userStatusListAll');
};

export const roleUserListAll = () => {
    return Http.get('dominio/roleListAll');
}
