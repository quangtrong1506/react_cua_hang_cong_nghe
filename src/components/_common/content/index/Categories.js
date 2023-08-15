import { useLayoutEffect } from 'react';
import { memo, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//element
function Categories() {
    let cats = useSelector((state) => state.categories);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories(cats);
    }, [cats]);
    function OWL() {
        function CategoriesCol({ image, link = '', title = '' }) {
            return (
                <>
                    <div className="">
                        <div
                            className="categories__item set-bg"
                            style={{
                                backgroundImage: ['url("', image, '")'].join(
                                    ''
                                ),
                            }}
                        >
                            <h5>
                                <Link to={link}>{title}</Link>
                            </h5>
                        </div>
                    </div>
                </>
            );
        }
        return (
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
                {categories.map((cat, index) => (
                    <CategoriesCol
                        key={index}
                        image="/images/demo-2.jpg"
                        link={`/products?categories=${cat}`}
                        title={cat}
                    ></CategoriesCol>
                ))}
            </OwlCarousel>
        );
    }
    return (
        <>
            <section className="categories">
                <div className="container">
                    <div className="row">
                        <OWL></OWL>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Categories);
