import $ from 'jquery';
import { memo, useEffect, useState } from 'react';
import { FaBars, FaCaretDown } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
function HeaderCategories() {
    const cats = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    function categoriesUlClick() {
        $('.hero__categories ul').slideToggle(400);
    }
    useEffect(() => {
        if (
            document.querySelector('.hero__categories ul').style.display ===
            'block'
        )
            $('.hero__categories ul').slideToggle(400);
    }, [location]);
    useEffect(() => {
        setCategories(cats);
    }, [cats]);
    return (
        <>
            <div className="hero__categories">
                <div
                    className="hero__categories__all"
                    onClick={categoriesUlClick}
                >
                    <FaBars className="svg-fa" />
                    <span>Danh mục</span>
                    <FaCaretDown className="down-svg" />
                </div>
                <ul className="hero__categories__ul">
                    {categories.map((cat, index) => (
                        <li key={index}>
                            <Link to={`/products?categories=${cat}`}>
                                {cat}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default memo(HeaderCategories);
