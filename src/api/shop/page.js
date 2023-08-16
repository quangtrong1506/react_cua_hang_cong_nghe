import { stringQuery } from '../../helpers/query';
import pageAxios from '../../plugins/axios';

const pageApis = {
    getCategories: () => {
        return pageAxios.get('products/categories');
    },
    getPosts: (options = {}) => {
        const query = stringQuery(options);
        return pageAxios.get('post' + query);
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
        return pageAxios.get(url);
    },
    getProductById: (id) => {
        return pageAxios.get('/product/' + id);
    },
    getCommentById: (id) => {
        return pageAxios.get('/comment/post/' + id);
    },
    getUserById: (id) => {
        return pageAxios.get('/user/' + id);
    },
};

export default pageApis;
