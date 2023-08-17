import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CartTable from '../../../components/_common/cart/cartTable';
import { initialCart, removeProduct } from '../../../features/page/cartSlice';
import {
    initialCheckout,
    resetCheckout,
} from '../../../features/page/checkoutSlice';
import { numberToVndString } from '../../../helpers/convert';
import { setPageTitle } from '../../../helpers/setPageTitle';
import { scrollToTop } from '../../../helpers/siteEffect';
const MySwal = withReactContent(Swal);

const Cart = () => {
    const carts = useSelector((state) => state.cart);
    const checkout = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState(carts.products);
    const [discount, setDiscount] = useState({
        code: '',
        amount: 0,
    });
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setPageTitle('Giỏ hàng');
        dispatch(resetCheckout());
    }, []);
    useEffect(() => {
        if (carts.products && isLoading) {
            let tempArr = [];
            carts?.products.forEach((element) => {
                let tmp = {
                    ...element,
                    isChecked: false,
                };
                tempArr.push(tmp);
            });
            dispatch(initialCart(tempArr));
            setLoading(false);
        }
    }, []);
    function handleDiscountBtnClick() {
        const discountCode = document.getElementById('discount-input').value;
        if (discountCode) {
            if (discountCode.toUpperCase() === 'MA1')
                setDiscount({ code: 'MA1', amount: 500000 });
            else
                setDiscount({
                    code: '',
                    amount: 0,
                });
        }
    }
    function handleGoToCheckout() {
        if (checkout?.products.length === 0)
            return MySwal.fire('', 'Bạn chưa lựa chọn sản phẩm nào', 'warning');
        dispatch(
            initialCheckout({
                products: checkout?.products,
                discount: {
                    code: discount.code,
                    amount: discount.amount,
                },
            })
        );
        checkout?.products.forEach((prod) => dispatch(removeProduct(prod.id)));
        navigate('/user/checkout');
        scrollToTop();
    }

    let total = checkout?.products.reduce((sum, prod) => {
        return prod.price * prod.quantity + sum;
    }, 0);
    let amountToPay = total - discount.amount < 0 ? 0 : total - discount.amount;
    return (
        <>
            <section className="shoping-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <CartTable />
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className={
                                'col-lg-12 ' +
                                (carts?.products.length === 0 &&
                                    'col-12 text-center')
                            }
                        >
                            <div className="shoping__cart__btns">
                                <Link
                                    to="/products"
                                    className="primary-btn cart-btn"
                                >
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            {carts?.products.length > 0 && (
                                <div className="shoping__continue">
                                    <div className="shoping__discount">
                                        <h5>Mã giảm giá</h5>
                                        <div>
                                            <input
                                                id="discount-input"
                                                type="text"
                                                placeholder="Nhập mã giảm giá"
                                            />
                                            <button
                                                type="button"
                                                className="site-btn"
                                                onClick={handleDiscountBtnClick}
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-6">
                            {carts?.products.length > 0 && (
                                <div className="shoping__checkout">
                                    <h5>Thanh toán hóa đơn</h5>
                                    <ul>
                                        <li>
                                            Tổng tiền sản phẩm
                                            <span id="total-all" data-value="0">
                                                {numberToVndString(total)}
                                            </span>
                                        </li>
                                        <li>
                                            Giảm giá{' '}
                                            <span
                                                id="discount-value"
                                                data-code=""
                                                data-value="0"
                                            >
                                                {'- ' +
                                                    numberToVndString(
                                                        discount.amount
                                                    )}
                                            </span>
                                        </li>
                                        <li>
                                            Thanh toán
                                            <span id="pay-all">
                                                {numberToVndString(amountToPay)}
                                            </span>
                                        </li>
                                    </ul>
                                    <button
                                        type="button"
                                        className="primary-btn"
                                        onClick={handleGoToCheckout}
                                    >
                                        Đến trang thanh toán
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default memo(Cart);
