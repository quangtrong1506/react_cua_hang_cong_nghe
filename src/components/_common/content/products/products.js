import { Link, useSearchParams } from 'react-router-dom';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { getStyleImage } from '../../../../helpers/backgroundImage';
import { sizeOfImage } from '../../../../helpers/checkImages';

//
const limitProduct = 16;
const scrollToTop = () => {
    let y = window.scrollY;
    let tmp = y;
    let yGoTo = 0;
    let setIntervalId = setInterval(() => {
        tmp = tmp - y / 10;
        if (tmp <= 0) tmp = 0;
        if (tmp > yGoTo) window.scrollTo(0, tmp);
        if (tmp === yGoTo) {
            clearInterval(setIntervalId);
        }
    }, 20);
};
function Products() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const selectedValues = useRef({
        categories: searchQuery.get('categories') || 'all',
        sort: searchQuery.get('sort') || '0',
    });
    let pageNumber = useRef({
        current: 1,
        max: 1,
    });
    const [categories, setCategories] = useState([{ value: 'all', label: 'Tất cả' }]);
    const sortArr = useRef([
        {
            value: '0',
            label: 'Mặc định',
        },
        {
            value: '1',
            label: 'Tên a-z',
        },
        {
            value: '2',
            label: 'Tên z-a',
        },
        {
            value: '3',
            label: 'Giá tăng dần',
        },
        {
            value: '4',
            label: 'Giá giảm dần',
        },
    ]);
    const [products, setProducts] = useState([]);
    let isNoProduct = useRef(false);
    //
    //

    useLayoutEffect(() => {
        scrollToTop();
        return () => {};
    }, [products]);
    useEffect(() => {
        selectedValues.current.categories = searchQuery.get('categories') || 'all';
    }, [searchQuery]);
    useEffect(() => {
        // tìm kiếm
        fetch('https://dummyjson.com/products/categories')
            .then((res) => res.json())
            .then((json) => {
                const arrCat = [];
                json.forEach((value) => {
                    arrCat.push({
                        value: value.replace(' ', '-'),
                        label:
                            value.slice(0, 1).toUpperCase() +
                            value.slice(1, value.length).toLowerCase(),
                    });
                });
                setCategories([...categories, ...arrCat]);
                //
                const cat = [...categories, ...arrCat].filter(
                    (cat) => cat.value === selectedValues.current.categories
                );
                if (!cat.length) {
                    selectedValues.current.categories = 'all';
                }
            });
    }, []);
    useEffect(() => {
        // tiêu đề
        let title = '';
        let p = searchQuery.get('page') ? ' - trang ' + searchQuery.get('page') : '';
        if (searchQuery.get('q')) title = searchQuery.get('q') + ' - kết quả tìm kiếm' + p;
        else if (searchQuery.get('categories') === 'all') title = 'Dach sách tất cả sản nhẩm' + p;
        else if (searchQuery.get('categories'))
            title = 'Tìm kiếm sản phẩm theo danh mục ' + searchQuery.get('categories') + p;
        else title = 'Dach sách tất cả sản nhẩm' + p;
        document.title = title;
        //
        const skip = (pageNumber.current.current - 1) * limitProduct;
        const q = '?skip=' + skip + '&limit=' + limitProduct;
        let url = '';
        if (searchQuery.get('q')) {
            url =
                'https://dummyjson.com/products/search?q=' +
                searchQuery.get('q') +
                q.replace('?', '&');
        } else if (selectedValues.current.categories === 'all') {
            url = 'https://dummyjson.com/products' + q;
        } else {
            url =
                'https://dummyjson.com/products/category/' + selectedValues.current.categories + q;
        }
        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                setProducts(json.products);
                isNoProduct.current = json.total > 0 ? false : true;
                pageNumber.current.max = Math.floor(json.total / limitProduct) + 1;
            });
    }, [searchQuery]);

    function handleCategoriesChange({ value, label }) {
        selectedValues.current.categories = value;
        setQueryParams({ categories: value });
    }
    function handleSortChange({ value, label }) {
        selectedValues.current.sort = value;
        setQueryParams({ sort: value });
    }
    function setQueryParams({ categories, sort }) {
        const query = {};
        pageNumber.current.current = 1;
        if (searchQuery.get('q')) query.q = searchQuery.get('q');
        query.categories = categories ? categories : selectedValues.current.categories;
        query.sort = sort ? sort : selectedValues.current.sort;
        setSearchQuery(query);
    }
    function ProductRow({
        prod = {
            thumbnail: '',
            price: 0,
            name: '',
            categories: [],
            url: '',
            status: 0,
            discountPercentage: 0,
        },
    }) {
        // demo
        prod.price = prod.price * 23000;
        const textPrice = prod.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        function shareHandler(url) {
            if (url) navigator.share(url);
        }
        const style = {
            backgroundSize: '',
            backgroundImage: getStyleImage(prod.thumbnail),
        };
        const size = sizeOfImage(prod.thumbnail);
        if (size.width <= size.height) {
            style.backgroundSize = 'contain';
        } else {
            style.backgroundSize = 'cover';
        }
        //0 bình thường 1 giảm giá 2 hết hàng 3 ngừng kinh doanh
        prod.status = Math.floor(Math.random() * 4);
        let status = {
            className: 'featured__item__status',
            title: '',
        };
        if (prod.status === 1 && prod.discountPercentage > 0) {
            status.className += ' badge badge-danger';
            status.title = '-' + prod.discountPercentage + '%';
        } else if (prod.status === 2) {
            status.className += ' badge het_hang';
            status.title = 'Hết hàng';
        } else if (prod.status === 3) {
            status.className += ' badge ngung_kinh_doanh';
            status.title = 'Ngừng kinh doanh';
        }
        return (
            <>
                <div
                    className={'col-lg-3 col-md-4 col-sm-4 col-6 mix ' + prod.categories.join(' ')}
                >
                    <div className="featured__item">
                        <div className="featured__item__pic set-bg" style={style}>
                            <ul className="featured__item__pic__hover">
                                {/* <li>
                                    <a href="#">
                                        <i className="fa fa-heart"></i>
                                    </a>
                                </li> */}
                                <li>
                                    <Link to="#">
                                        <i
                                            className="fa fa-share-alt"
                                            onClick={() => {
                                                shareHandler(prod.url);
                                            }}
                                        ></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <i className="fa fa-shopping-cart"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="featured__item__text">
                            <h6>
                                <Link to={prod.url}>{prod.name}</Link>
                            </h6>
                            <h5>{textPrice}</h5>
                        </div>
                        <span className={status.className}>{status.title}</span>
                    </div>
                </div>
            </>
        );
    }
    function Page() {
        if (searchQuery.get('page')) pageNumber.current.current = parseInt(searchQuery.get('page'));
        let page = pageNumber.current.current;
        if (isNoProduct.current) return <></>;
        function getLink(page) {
            let query = '?';
            if (searchQuery.get('q')) query += 'q=' + searchQuery.get('q');
            else query += '&categories=' + selectedValues.current.categories;
            if (selectedValues.current.sort !== '0' && selectedValues.current.sort)
                query += '&sort=' + selectedValues.current.sort;
            query += '&page=' + page;
            return window.location.pathname + query.replace('?&', '?');
        }
        return (
            <>
                {page > 1 && (
                    <>
                        <Link to={getLink(page - 1)}>
                            <i className="fa fa-long-arrow-left"></i>
                        </Link>
                        {page > 2 && page === pageNumber.current.max && (
                            <Link to={getLink(page - 2)}>{page - 2}</Link>
                        )}
                        <Link to={getLink(page - 1)}>{page - 1}</Link>
                    </>
                )}

                <Link to={getLink(page)} className="active">
                    {page}
                </Link>
                {page < pageNumber.current.max && (
                    <>
                        <Link to={getLink(page + 1)}>{page + 1}</Link>
                    </>
                )}
                {page + 1 < pageNumber.current.max && (
                    <>
                        <Link to={getLink(page + 2)}>{page + 2}</Link>
                    </>
                )}
                {page < pageNumber.current.max && (
                    <>
                        <Link to={getLink(page + 1)}>
                            <i className="fa fa-long-arrow-right"></i>
                        </Link>
                    </>
                )}
            </>
        );
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
                                                        selectedValues.current.categories
                                                )}
                                                defaultValue={categories.filter(
                                                    (cat) =>
                                                        cat.value ===
                                                        selectedValues.current.categories
                                                )}
                                                onChange={handleCategoriesChange}
                                            ></Select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <div className="filter__sort right">
                                            <span>Sắp xếp</span>
                                            <Select
                                                id="sort_product"
                                                className="filter__sort__select"
                                                options={sortArr.current}
                                                defaultValue={sortArr.current.filter(
                                                    (s) => s.value === selectedValues.current.sort
                                                )}
                                                value={sortArr.current.filter(
                                                    (s) => s.value === selectedValues.current.sort
                                                )}
                                                onChange={handleSortChange}
                                            ></Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row product__grid">
                                {!isNoProduct.current &&
                                    products.map((prod, index) => {
                                        const product = {
                                            name: prod.title,
                                            price: prod.price,
                                            thumbnail: prod.thumbnail,
                                            categories: [prod.categories],
                                            discountPercentage: prod.discountPercentage,
                                        };
                                        return <ProductRow key={index} prod={product}></ProductRow>;
                                    })}
                                {isNoProduct.current && (
                                    <div className="product__grid__empty__text">
                                        <h1>Oops!</h1>
                                        <h3>Không tìm thấy sản phẩm nào</h3>
                                    </div>
                                )}
                            </div>
                            <div className="product__pagination">
                                <Page></Page>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Products);
