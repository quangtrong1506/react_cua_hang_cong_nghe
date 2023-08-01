import { Link } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { getStyleImage } from '../../../../helpers/backgroundImage';
import { sizeOfImage } from '../../../../helpers/checkImages';

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const limitProduct = 20;
    const [listProduct, setListProduct] = useState([]);
    const limitFilter = 4;
    const [filter, setFilter] = useState([]);
    const [filterActive, setFilterActive] = useState('*');
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((json) => {
                setProducts(json.products);
            });
        fetch('https://dummyjson.com/products/categories')
            .then((res) => res.json())
            .then((json) => {
                setCategories(json);
            });
    }, []);

    useEffect(() => {
        setListProduct(products.slice(0, limitProduct));
    }, [products]);
    useEffect(() => {
        const ft = [];
        const cats = categories.slice(0, limitFilter);
        ft.push({ name: 'Tất cả', key: '*' });
        cats.forEach((f) => {
            ft.push({
                key: f.replace(/[^a-zA-z]/g, '-'),
                name: f,
            });
        });
        ft.push({ name: 'Khác', key: 'other' });
        setFilter(ft);
    }, [categories]);
    function ListProduct() {
        return (
            <>
                {listProduct.map((prod, index) => {
                    const product = {
                        name: prod.title,
                        price: prod.price,
                        thumbnail: prod.thumbnail,
                        categories: [prod.categories],
                        discountPercentage: prod.discountPercentage,
                    };
                    return <GetRow key={index} prod={product}></GetRow>;
                })}
            </>
        );
    }
    function GetRow({
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
    function Filter() {
        return (
            <>
                <ul className="featured__controls__list_filter">
                    {filter.map((ft, index) => {
                        const classList = ft.key === filterActive ? 'active' : '';
                        return (
                            <li
                                key={index}
                                className={classList}
                                data-filter={ft.key}
                                onClick={filterHandler}
                            >
                                {ft.name}
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
    function filterHandler(e) {
        const element = e.target;
        const filter = element.getAttribute('data-filter');
        if (filterActive === filter && filter !== 'other') return;
        setFilterActive(filter);
        if (filter === '*') {
            fetch('https://dummyjson.com/products')
                .then((res) => res.json())
                .then((json) => {
                    setProducts(json.products);
                });
        } else if (filter === 'other') {
            const other = categories[Math.floor(Math.random() * (categories.length - 4)) + 4];
            fetch('https://dummyjson.com/products/category/' + other)
                .then((res) => res.json())
                .then((json) => {
                    setProducts(json.products);
                });
        } else
            fetch('https://dummyjson.com/products/category/' + filter)
                .then((res) => res.json())
                .then((json) => {
                    setProducts(json.products);
                });
    }

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Sản phẩm mới nhất</h2>
                            </div>
                            <div className="featured__controls">
                                <Filter></Filter>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        <ListProduct></ListProduct>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Products);
