import { stringQuery } from '../../helpers/query';
import baseAdminAxios from '../../plugins/axios';

const pageApis = {
    getCategories: () => {
        return baseAdminAxios.get('products/categories');
    },
    getPosts: (options = {}) => {
        const query = stringQuery(options);
        return baseAdminAxios.get('post' + query);
    },
    getProducts: (params = {}, page, limit) => {
        const base = '/products';
        let path = '';
        if (params.q) path = '/search';
        if (params.categories && params.categories !== 'all') {
            path = '/category/' + params.categories;
            params.categories = null;
        }
        if (params.categories === 'all') {
            params.categories = null;
        }
        let url =
            base +
            path +
            stringQuery({
                ...params,
                page,
                limit,
            });
        //? base/path?=query
        return baseAdminAxios.get(url);
    },
    getProductById: (id) => {
        return baseAdminAxios.get('/product/' + id);
    },
    getCommentById: (id) => {
        return baseAdminAxios.get('/comment/post/' + id);
    },
    getUserById: (id) => {
        return baseAdminAxios.get('/user/' + id);
    },
};

export default pageApis;
