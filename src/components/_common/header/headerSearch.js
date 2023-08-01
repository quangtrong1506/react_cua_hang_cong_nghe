import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { useRef } from 'react';

function HeaderSearch() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const [textSearch, setTextSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://dummyjson.com/products/search?q=' + textSearch)
            .then((res) => res.json())
            .then((json) => {
                setProducts(json.products);
            });
    }, [textSearch]);
    useEffect(() => {
        document.querySelector('.hero__search').addEventListener('mouseleave', () => {
            setActive(false);
        });
        document.getElementById('input-search').addEventListener('click', () => {
            setActive(true);
        });
        return () => {};
    }, []);
    function GetLiTag({ List }) {
        return (
            <>
                {List.map((prod, index) => (
                    <li key={index}>
                        <Link to={prod.link}>{prod.title}</Link>
                    </li>
                ))}
            </>
        );
    }
    function ShowResultSearch({ products }) {
        if (!textSearch) {
            return <></>;
        }
        const maxResult = 10;
        const newProducts =
            products.length <= maxResult ? products.slice() : products.slice(0, maxResult - 1);
        if (!products.length)
            newProducts.push({ link: '#', title: 'Không có kết quả tìm kiếm phù hợp' });
        return (
            <>
                <div className="hero__search__result">
                    <ul>
                        <GetLiTag List={newProducts} />
                    </ul>
                </div>
            </>
        );
    }

    async function SubmitHander(e) {
        e.preventDefault();
        if (!document.getElementById('input-search').value) return;
        setActive(false);
        const linkSearch = '/products?q=' + document.getElementById('input-search').value;
        navigate(linkSearch);
    }
    return (
        <>
            <div className="hero__search">
                <div className="hero__search__form">
                    <form action="#" onSubmit={SubmitHander}>
                        <input
                            id="input-search"
                            type="text"
                            placeholder="Bạn muốn tìm gì?"
                            name="q"
                            autoComplete="off"
                            onInput={(e) => {
                                setActive(true);
                                setTextSearch(e.target.value);
                            }}
                        />
                        <button type="submit" className="site-btn">
                            SEARCH
                        </button>
                    </form>
                    {active && <ShowResultSearch products={products} />}
                </div>
                <div className="hero__search__phone">
                    <a href="tel:0389619050">
                        <div className="hero__search__phone__icon">
                            <i className="fa fa-phone"></i>
                        </div>
                        <div className="hero__search__phone__text">
                            <h5>+84 389 619 050</h5>
                            <span>Hỗ trợ 24/7</span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default memo(HeaderSearch);
