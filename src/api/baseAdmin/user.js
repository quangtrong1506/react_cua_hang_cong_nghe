import baseAdminAxios from "../../plugins/axios";
import {getHeaderWithAuthorizationBearerToken} from "../../helpers/common";
import {PAGINATION} from "../../helpers/constants";
const baseRoute = 'users/'

const userApis = {
    index: (params = {}, page = PAGINATION.startPage, limit = PAGINATION.limit) => {

        return baseAdminAxios.get(baseRoute, {
            params: {
                ...params,
                pagination: {
                    page,
                    limit
                }
            },
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    destroy: (userId) => {
        return baseAdminAxios.delete(baseRoute + userId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (userId) => {
        return baseAdminAxios.get(baseRoute + userId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (userId, data) => {
        return baseAdminAxios.put(baseRoute + userId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    export: (data) => {
        return baseAdminAxios.post(baseRoute + 'export', data,{
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    getUserImportHistory: () => {
        return baseAdminAxios.get(baseRoute + 'import/history', {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    showUserImportNewest: () => {
        return baseAdminAxios.get(baseRoute + 'import/newest', {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    import: (data) => {
        return baseAdminAxios.post(baseRoute + 'import', data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    }
};

export default userApis;