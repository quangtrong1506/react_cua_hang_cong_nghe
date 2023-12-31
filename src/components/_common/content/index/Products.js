import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import pageApis from '../../../../api/shop/page';
import Product from '../../../../components/_common/content/product/product';

function Products() {
    let categories = useSelector((state) => state.categories);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const [filterActive, setFilterActive] = useState('*');
    useEffect(() => {
        (async () => {
            const resProds = await pageApis.getProducts({}, 1, 16);
            if (resProds.success) setProducts((await resProds).data.products);
        })();
    }, []);
    useEffect(() => {
        const ft = [];
        const cats = categories.slice(0, 4);
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
    function Filter() {
        return (
            <>
                <ul className="featured__controls__list_filter">
                    {filter.map((ft, index) => {
                        const classList =
                            ft.key === filterActive ? 'active' : '';
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
            const other =
                categories[
                    Math.floor(Math.random() * (categories.length - 4)) + 4
                ];
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
                        {products.map((prod, index) => {
                            return (
                                <Product
                                    key={index}
                                    name={prod.title}
                                    price={prod.price}
                                    thumbnail={prod.thumbnail}
                                    status={prod.status}
                                    categories={prod.categories}
                                    discountPercentage={prod.discountPercentage}
                                    url={'/products/' + prod.id}
                                    id={prod.id}
                                ></Product>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Products);
