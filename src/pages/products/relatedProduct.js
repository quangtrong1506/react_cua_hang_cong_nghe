import { memo, useEffect, useState } from 'react';
import pageApis from '../../api/shop/page';
import Product from '../../components/_common/content/product/product';

const RelatedProduct = ({ category, limit = 8 }) => {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await pageApis.getProducts(
                { categories: category },
                1,
                limit
            );
            if (res.success) setProduct(res.data.products);
        })();
    }, [category, limit]);
    return (
        <>
            <section className="related-product">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title related__product__title">
                                <h2>Các sản phẩm liên quan</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {product.map((prod, key) => (
                            <Product
                                key={key}
                                name={prod.title}
                                price={prod.price}
                                thumbnail={prod.thumbnail}
                                discountPercentage={prod.discountPercentage}
                                url={'/products/' + prod.id}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
export default memo(RelatedProduct);
