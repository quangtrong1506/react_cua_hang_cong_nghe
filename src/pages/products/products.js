import { Link, useSearchParams } from 'react-router-dom';
import {
    memo,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Select from 'react-select';
import { scrollToTop } from '../../helpers/siteEffect';
import { SORT } from '../../helpers/constants';
import Product from '../../components/_common/content/product/product';
import { useSelector } from 'react-redux';
import CustomPagination from '../../components/customPagination';
import { setPageTitle } from '../../helpers/setPageTitle';
import pageApis from '../../api/shop/page';
//
const limitProduct = 16;
function Products() {
    const CATS = useSelector((state) => state.categories);
    const [searchQuery, setSearchQuery] = useSearchParams();
    const [selectedValues, setSelectedValues] = useState({
        categories: searchQuery.get('categories') || 'all',
        sort: searchQuery.get('sort') || '0',
    });
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageCurrent, setPageCurrent] = useState({
        page: parseInt(searchQuery.get('page') || 1),
        pages: 1,
    });
    let isLoading = useRef(true);
    useEffect(() => {
        setPageCurrent((state) => ({
            ...state,
            page: parseInt(searchQuery.get('page') || 1),
        }));
        setSelectedValues({
            categories: searchQuery.get('categories') || 'all',
            sort: searchQuery.get('sort') || '0',
        });
    }, [searchQuery]);
    useLayoutEffect(() => {
        scrollToTop();
        return () => {};
    }, [products]);
    useEffect(() => {
        const arrCat = [];
        CATS.forEach((value) => {
            arrCat.push({
                value: value.replace(' ', '-'),
                label:
                    value.slice(0, 1).toUpperCase() +
                    value.slice(1, value.length).toLowerCase(),
            });
        });
        setCategories([{ value: 'all', label: 'Tất cả' }, ...arrCat]);
        //
    }, [CATS]);
    const setTitle = useMemo(() => {
        return () => {
            let p = searchQuery.get('page')
                ? ' - trang ' + searchQuery.get('page')
                : '';
            if (searchQuery.get('q'))
                setPageTitle(searchQuery.get('q') + ' - kết quả tìm kiếm' + p);
            else if (searchQuery.get('categories') === 'all')
                setPageTitle('Dach sách tất cả sản nhẩm' + p);
            else if (searchQuery.get('categories'))
                setPageTitle(
                    'Tìm kiếm sản phẩm theo danh mục ' +
                        searchQuery.get('categories') +
                        p
                );
            else setPageTitle('Dach sách tất cả sản nhẩm' + p);
        };
    }, [searchQuery]);
    useEffect(() => {
        setTitle();
        (async () => {
            let params = {
                q: null,
                categories: null,
                skip: 0,
                sort: 0,
            };
            let page = parseInt(searchQuery.get('page') || 1);
            let limit = limitProduct;
            if (searchQuery.get('q')) {
                params.q = searchQuery.get('q');
            } else params.categories = selectedValues.categories;
            params.skip = (pageCurrent.page - 1) * limitProduct;
            isLoading.current = true;
            const prods = await pageApis.getProducts(params, page, limit);
            setProducts(prods.data.products);
            setPageCurrent((state) => ({
                ...state,
                pages: Math.floor(prods.data.total / limitProduct) + 1,
            }));
            isLoading.current = false;
        })();
    }, [pageCurrent.page, searchQuery, selectedValues, setTitle]);
    function handleCategoriesChange({ value, label }) {
        setSelectedValues((s) => ({ ...s, categories: value }));
        setPageCurrent((state) => ({
            ...state,
            page: 1,
        }));
        setQueryParams({ categories: value });
    }
    function handleSortChange({ value, label }) {
        setSelectedValues((s) => ({ ...s, sort: value }));
        setPageCurrent((state) => ({
            ...state,
            page: 1,
        }));
        setQueryParams({ sort: value });
    }
    function setQueryParams({ categories, sort }) {
        const query = {};
        if (searchQuery.get('q')) query.q = searchQuery.get('q');
        query.categories = categories ? categories : selectedValues.categories;
        query.sort = sort ? sort : selectedValues.sort;
        setSearchQuery(query);
    }
    function handleChangePage(page) {
        setPageCurrent((state) => ({
            ...state,
            page: page,
        }));
    }
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="filter__sort">
                                            <span>Lọc</span>
                                            <Select
                                                className="filter__sort__select"
                                                options={categories}
                                                value={categories.filter(
                                                    (cat) =>
                                                        cat.value ===
                                                        selectedValues.categories
                                                )}
                                                defaultValue={categories.filter(
                                                    (cat) =>
                                                        cat.value ===
                                                        selectedValues.categories
                                                )}
                                                onChange={
                                                    handleCategoriesChange
                                                }
                                            ></Select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="filter__sort right">
                                            <span>Sắp xếp</span>
                                            <Select
                                                id="sort_product"
                                                className="filter__sort__select"
                                                options={SORT}
                                                defaultValue={SORT.filter(
                                                    (s) =>
                                                        s.value ===
                                                        selectedValues.sort
                                                )}
                                                value={SORT.filter(
                                                    (s) =>
                                                        s.value ===
                                                        selectedValues.sort
                                                )}
                                                onChange={handleSortChange}
                                            ></Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row product__grid">
                                {!isLoading.current &&
                                    products.length > 0 &&
                                    products.map((prod, index) => {
                                        return (
                                            <Product
                                                key={index}
                                                name={prod.title}
                                                price={prod.price}
                                                thumbnail={prod.thumbnail}
                                                status={prod.status}
                                                categories={prod.categories}
                                                discountPercentage={
                                                    prod.discountPercentage
                                                }
                                                url={'/products/' + prod.id}
                                                id={prod.id}
                                            ></Product>
                                        );
                                    })}
                                {!isLoading.current &&
                                    products.length === 0 && (
                                        <div className="product__grid__empty__text">
                                            <h1>Oops!</h1>
                                            <h3>Không tìm thấy sản phẩm nào</h3>
                                        </div>
                                    )}
                                {isLoading.current && (
                                    <div className="bootstrap-loading">
                                        <div
                                            className="spinner-border"
                                            role="status"
                                        ></div>
                                    </div>
                                )}
                            </div>
                            <div className="product__pagination">
                                <CustomPagination
                                    page={pageCurrent.page}
                                    pages={pageCurrent.pages}
                                    handleChange={handleChangePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Products);
