import { Link } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//element
function Categories() {
    const [categories, setCategories] = useState([]);
    function CategoriesRow({ image, link = '', title = '' }) {
        return (
            <>
                <div className="col-lg-3">
                    <div
                        className="categories__item set-bg"
                        style={{ backgroundImage: ['url("', image, '")'].join('') }}
                    >
                        <h5>
                            <Link to={link}>{title}</Link>
                        </h5>
                    </div>
                </div>
            </>
        );
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then((res) => res.json())
            .then((json) => setCategories(json));
        fetch('https://dummyjson.com/products/categories')
            .then((res) => res.json())
            .then((json) => setCategories(json));
    }, []);

    function GetItem() {
        return categories.map((cat, index) => {
            return (
                <CategoriesRow
                    key={index}
                    image="/images/logo.png"
                    link={`/products?categories=${cat}`}
                    title={cat}
                ></CategoriesRow>
            );
        });
    }
    return (
        <>
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <OwlCarousel
                            className="categories__slider"
                            nav
                            dots={false}
                            loop
                            animateOut={'fadeOut'}
                            animateIn={'fadeIn'}
                            smartSpeed={1200}
                            autoplayTimeout={3000}
                            autoplay
                            autoplayHoverPause
                            responsive={{
                                550: {
                                    items: 3,
                                },
                                768: {
                                    items: 4,
                                },

                                992: {
                                    items: 5,
                                },
                                1400: {
                                    items: 6,
                                },
                            }}
                        >
                            <GetItem></GetItem>
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Categories);
