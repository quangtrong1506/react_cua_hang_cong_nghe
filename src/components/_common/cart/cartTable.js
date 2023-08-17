import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialCheckout } from '../../../features/page/checkoutSlice';
import CartProduct from './cartProduct';

export default memo(function ProductTable() {
    const cart = useSelector((state) => state.cart);
    const checkout = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    let isLoading = false;
    useEffect(() => {
        setProducts(cart?.products);
    }, []);
    const handleChangeCheckAll = (e) => {
        if (e.target.checked)
            dispatch(
                initialCheckout({
                    products: cart.products,
                })
            );
        else
            dispatch(
                initialCheckout({
                    products: [],
                })
            );
        setProducts(cart?.products);
    };
    const isCheckAll = cart?.products.length === checkout?.products.length;
    if (isLoading)
        return (
            <>
                <div className="spad text-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            </>
        );
    if (products.length === 0)
        return (
            <>
                <div className="text-center pb-5">
                    <h1>Oops!</h1>
                    <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>
                </div>
            </>
        );

    return (
        <>
            <div className="shoping__cart__table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <label className="container prod-check-all">
                                    <input
                                        id="prod-check-all"
                                        type="checkbox"
                                        checked={isCheckAll}
                                        onChange={handleChangeCheckAll}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>
                            <th className="shoping__product">Sản phẩm</th>
                            <th className="shoping__price">Giá</th>
                            <th className="shoping__quantity">Số lượng</th>
                            <th className="shoping__total">Thành tiền</th>
                            <th className="shoping__close"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((prod, key) => (
                            <CartProduct
                                key={key}
                                product={prod}
                                handleRemove={(id) => {
                                    const newProds = products.filter(
                                        (prod) => prod.id !== id
                                    );
                                    setProducts(newProds);
                                }}
                                isChecked={
                                    checkout.products.find(
                                        (product) => product.id === prod.id
                                    )
                                        ? true
                                        : false
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
});
