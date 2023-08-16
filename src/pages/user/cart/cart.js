import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CartProduct from '../../../components/_common/cart/cartProduct';
import { removeProduct, updateCart } from '../../../features/page/cartSlice';
import { initialCheckout } from '../../../features/page/checkoutSlice';
import { numberToVndString } from '../../../helpers/convert';
import { setPageTitle } from '../../../helpers/setPageTitle';
const MySwal = withReactContent(Swal);

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => state.cart);
    const [products, setProducts] = useState(carts.products);
    const [discount, setDiscount] = useState({
        code: '',
        amount: 0,
    });
    let isLoading = carts ? false : true;
    useEffect(() => {
        setPageTitle('Giỏ hàng');
    }, []);
    console.log('render');
    useEffect(() => {
        if (carts.products) {
            let tempArr = [];
            carts?.products.forEach((element) => {
                let prodOld = products.find((prod) => prod.id === element.id);
                let tmp = {
                    ...element,
                    isChecked: prodOld?.isChecked ? prodOld?.isChecked : false,
                };
                tempArr.push(tmp);
            });
            setProducts(tempArr);
        }
    }, [carts]);
    const updateCartHandler = (product) => {
        dispatch(updateCart(product));
    };
    const removeCartHandler = (id) => {
        dispatch(removeProduct(id));
    };
    const checkedHandler = (id, checked) => {
        setProducts((products) => {
            let newProds = [...products];
            let prod = newProds.find((prod) => prod.id === id);
            if (prod) prod.isChecked = checked;
            return newProds;
        });
    };
    const handleChangeCheckAll = (e) => {
        const check = e.target.checked;
        const newProds = [...products];
        if (check) newProds.forEach((prod) => (prod.isChecked = true));
        else newProds.forEach((prod) => (prod.isChecked = false));
        setProducts(newProds);
    };
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
        const prods = products.filter((prod) => prod.isChecked === true);
        if (prods.length === 0)
            return MySwal.fire('', 'Bạn chưa lựa chọn sản phẩm nào', 'warning');
        dispatch(
            initialCheckout({
                products: prods,
                discount: {
                    code: discount.code,
                    amount: discount.amount,
                },
            })
        );
        prods.forEach((prod) => dispatch(removeProduct(prod.id)));
        navigate('/user/checkout');
    }
    function ProductsTable() {
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
            <div className="shoping__cart__table">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <label className="container prod-check-all">
                                    <input
                                        id="prod-check-all"
                                        type="checkbox"
                                        defaultChecked={
                                            !products.some((product) => {
                                                return (
                                                    product.isChecked === false
                                                );
                                            })
                                                ? 'checked'
                                                : ''
                                        }
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
                                removeCartHandler={removeCartHandler}
                                updateCartHandler={updateCartHandler}
                                checkedHandler={checkedHandler}
                                isChecked={products.isChecked}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    let total = products.reduce((sum, prod) => {
        if (prod.isChecked) return prod.price * prod.quantity + sum;
        return sum;
    }, 0);
    let amountToPay = total - discount.amount < 0 ? 0 : total - discount.amount;
    return (
        <>
            <section className="shoping-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProductsTable />
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className={
                                'col-lg-12 ' +
                                (products.length === 0 && 'col-12 text-center')
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
                            {products.length > 0 && (
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
                            {products.length > 0 && (
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
