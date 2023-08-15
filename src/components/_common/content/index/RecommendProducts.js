import { Link } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { sizeOfImage } from '../../../../helpers/image';
function RecommendProducts() {
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((json) => setSlider(json.products));
    }, []);

    function RowProduct({ product }) {
        let price = product.price * 10000;
        product.name = product.title;
        const textPrice = price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        function onloadHandler(e) {
            const element = e.target;
            const size = sizeOfImage(element);
            if (size.width <= size.height) element.style.objectFit = 'contain';
            else element.style.objectFit = 'cover';
        }
        return (
            <>
                <Link to={product.url} className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={product.images[0]} alt={product.image} onLoad={onloadHandler} />
                    </div>
                    <div className="latest-product__item__text">
                        <h6>{product.name}</h6>
                        <span>{textPrice}</span>
                    </div>
                </Link>
            </>
        );
    }
    function ListProduct({ products }) {
        return (
            <>
                <div className="latest-prdouct__slider__item">
                    {products.map((product, index) => (
                        <RowProduct key={index} product={product}></RowProduct>
                    ))}
                </div>
            </>
        );
    }
    function ProductSlider({ list }) {
        const arr = [];
        for (let i = 0; i < list.length / 3; i++) {
            const count = i * 3;
            arr.push([list[count], list[count + 1], list[count + 2]]);
        }
        return (
            <>
                <OwlCarousel
                    className="latest-product__slider"
                    loop
                    items={1}
                    nav
                    autoplay
                    smartSpeed={1200}
                >
                    {arr.map((products, index) => (
                        <ListProduct key={index} products={products}></ListProduct>
                    ))}
                </OwlCarousel>
            </>
        );
    }
    return (
        <>
            <section className="latest-product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="latest-product__text">
                                <h4>Mới nhất</h4>
                                <ProductSlider list={slider}></ProductSlider>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="latest-product__text">
                                <h4>Bán chạy</h4>
                                {/* <ProductSlider></ProductSlider> */}
                                <ProductSlider list={slider}></ProductSlider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(RecommendProducts);
