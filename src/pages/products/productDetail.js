import { memo, useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/_common/content/product/button';
import OwlCarousel from 'react-owl-carousel';
import Comments from '../../components/_common/content/comment/comments';
import { useState } from 'react';
import pageApis from '../../api/shop/page';
import { numberToVndString } from '../../helpers/convert';
import { FaShare } from 'react-icons/fa';
import { setPageTitle } from '../../helpers/setPageTitle';
import { scrollToTop } from '../../helpers/siteEffect';
import RelatedProduct from './relatedProduct';
const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        (async () => {
            const res = await pageApis.getProductById(slug);
            if (res.success) {
                const prod = res.data;
                prod.price = prod.price * 23000;
                setProduct(prod);
            }
        })();
    }, [slug]);
    useEffect(() => {
        if (product.title) setPageTitle(product.title);
        scrollToTop();
        let handleClick = (url) => {
            document.querySelector('.product__details__pic__item img').src =
                url;
        };
        document.querySelectorAll('.owl-item .item').forEach((element) => {
            element.addEventListener('click', () => {
                handleClick(element.firstElementChild.getAttribute('data-url'));
            });
        });
    }, [product]);
    function ImageSlider({ images = [] }) {
        function Col({ url }) {
            return (
                <>
                    <div className="item" data-url={url}>
                        <img src={url} alt={url} data-url={url} />
                    </div>
                </>
            );
        }
        return (
            <OwlCarousel
                className="product-detail__slider"
                nav={false}
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
                        items: 4,
                    },
                    768: {
                        items: 3,
                    },

                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 3.5,
                    },
                }}
            >
                {images.map((url, index) => (
                    <Col key={index} url={url}></Col>
                ))}
            </OwlCarousel>
        );
    }
    function handleTabClick(n) {
        let nav = document.querySelectorAll('.product__details__tab .nav-link');
        let tab = document.querySelectorAll('.product__details__tab .tab-pane');
        if (nav[n] && tab[n]) {
            nav.forEach((element) => element.classList.remove('active'));
            tab.forEach((element) => element.classList.remove('active'));
            tab[n].classList.add('active');
            nav[n].classList.add('active');
        }
    }
    function Price() {
        let priceOld = product.price;
        let newPrice = priceOld - (priceOld * product.discountPercentage) / 100;

        return (
            <>
                <span className="product__details__price__old">
                    {product.price && numberToVndString(priceOld)}
                </span>
                <span>{product.price && numberToVndString(newPrice)}</span>
                <span className="product__details__price__present">
                    {'Giảm ' + product.discountPercentage + '%'}
                </span>
            </>
        );
    }

    return (
        <>
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        src={product?.thumbnail}
                                        alt={product?.thumbnail}
                                    />
                                </div>
                                <ImageSlider images={product?.images} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{product?.titled}</h3>
                                <div className="product__details__rating">
                                    <div className="rating_stars star-selector"></div>
                                </div>
                                <div className="product__details__price">
                                    <Price />
                                </div>
                                <Button product={product} />

                                <ul>
                                    <li>
                                        <b>Sản phẩm có sẵn</b>
                                        <span className="count-so-luong-co">
                                            {product?.stock}
                                        </span>
                                    </li>
                                    <li>
                                        <b>Chia sẻ</b>
                                        <div className="share">
                                            <span
                                                onClick={() => {
                                                    window.navigator.share({
                                                        text: product.title,
                                                        title: 'Chia sẻ sản phẩm',
                                                        url:
                                                            '/product/' +
                                                            product.id,
                                                    });
                                                }}
                                            >
                                                <FaShare
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-toggle="tab"
                                            href="#tabs-1"
                                            role="tab"
                                            aria-selected="false"
                                            onClick={() => {
                                                handleTabClick(0);
                                            }}
                                        >
                                            Thông tin sản phẩm
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            data-toggle="tab"
                                            href="#tabs-2"
                                            role="tab"
                                            aria-selected="true"
                                            onClick={() => {
                                                handleTabClick(1);
                                            }}
                                        >
                                            Đánh giá sản phẩm
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div
                                        className="tab-pane active"
                                        id="tabs-1"
                                        role="tabpanel"
                                    >
                                        <div className="product__details__tab__desc">
                                            {product?.description}
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane"
                                        id="tabs-2"
                                        role="tabpanel"
                                        style={{ marginBottom: '50px' }}
                                    >
                                        <div className="product__details__tab__desc">
                                            <Comments id={product.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedProduct category={product.category} />
        </>
    );
};
export default memo(ProductDetail);
