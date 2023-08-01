import { Link } from 'react-router-dom';
import { memo, useEffect, useState, useRef } from 'react';
import $ from 'jquery';

function HeaderCategories() {
    const [categories, setCategories] = useState([]);
    const ulTag = useRef();
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then((res) => res.json())
            .then((json) => setCategories(json));
    }, []);
    useEffect(() => {
        ulTag.current.addEventListener('click', () => {
            $('.hero__categories ul').slideUp(400);
        });
        return () => {};
    }, []);
    return (
        <>
            <ul ref={ulTag} className="hero__categories__ul">
                {categories.map((cat, index) => (
                    <li key={index}>
                        <Link to={`/products?categories=${cat}`}>{cat}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default memo(HeaderCategories);
