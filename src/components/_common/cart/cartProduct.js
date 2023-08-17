import { memo, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import pageApis from '../../../api/shop/page';
import { removeProduct, updateCart } from '../../../features/page/cartSlice';
import {
    addToCheckout,
    removeProductInCheckOut,
    updateCheckout,
} from '../../../features/page/checkoutSlice';
import { numberToVndString } from '../../../helpers/convert';
const MySwal = withReactContent(Swal);

const Product = ({ product, handleRemove, isChecked }) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const [productCurrent, setProduct] = useState(product);
    const inputRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            if (product.stock === undefined) {
                const res = await pageApis.getProductById(product.id);
                if (res.success) {
                    res.data.price = res.data.price * 23000;
                    setProduct(res.data);
                }
            }
        })();
    }, [product]);
    useEffect(() => {
        if (isChecked)
            dispatch(
                updateCheckout({
                    ...product,
                    quantity,
                })
            );
    }, [quantity]);
    const handleQuantityChange = (e) => {
        let num = +e.target.value;
        if (!isNaN(num) || !e.target.value.toString().match('e')) {
            if (num > productCurrent.stock) {
                MySwal.fire({
                    html:
                        'Bạn chỉ có thể nhập số lượng nhỏ hơn hoặc bằng ' +
                        productCurrent.stock,
                    icon: 'warning',
                });
                setQuantity(productCurrent.stock);
                dispatch(
                    updateCart({
                        ...productCurrent,
                        quantity: productCurrent.stock,
                    })
                );
            } else {
                setQuantity(num);
                setQuantity(e.target.value);
                dispatch(
                    updateCart({
                        ...productCurrent,
                        quantity: num,
                    })
                );
            }
        } else {
            MySwal.fire({
                html: 'Vui lòng nhập đúng định dạng',
                icon: 'warning',
            });
        }
        inputRef.current.focus();
    };
    const handleQuantityBlur = (e) => {
        let num = +e.target.value;
        if (!num) {
            setQuantity(1);
            dispatch(updateCart({ ...productCurrent, quantity: 1 }));
        } else if (e.target.value === 0) confirmRemove();
    };
    const handleBtnClick = (e) => {
        if (e.target.classList.contains('inc')) {
            if (quantity + 1 > productCurrent.stock)
                MySwal.fire({
                    html: 'Bạn đã nhập quá số lượng mà cửa hàng đang có',
                    icon: 'warning',
                });
            else {
                setQuantity(parseInt(quantity) + 1);
                dispatch(
                    updateCart({
                        ...productCurrent,
                        quantity: parseInt(quantity) + 1,
                    })
                );
            }
        } else {
            if (quantity > 1) {
                setQuantity(parseInt(quantity) - 1);
                dispatch(
                    updateCart({
                        ...productCurrent,
                        quantity: parseInt(quantity) - 1,
                        isChecked: product.isChecked,
                    })
                );
            } else confirmRemove();
        }
    };
    function confirmRemove() {
        MySwal.fire({
            title: 'Xác nhận xoá sản phẩm ra khỏi giỏ hàng',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Xác nhận',
            denyButtonText: `Huỷ`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeProduct(productCurrent.id));
                dispatch(removeProductInCheckOut(productCurrent.id));
                handleRemove(productCurrent.id);
            }
        });
    }
    const handleCheckChange = (e) => {
        const newProds = {
            ...product,
            quantity: quantity,
        };
        if (e.target.checked) dispatch(addToCheckout(newProds));
        else dispatch(removeProductInCheckOut(product.id));
    };
    return (
        <>
            <tr>
                <td>
                    <label className="container">
                        <input
                            className="prod-select"
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                </td>
                <td className="shoping__cart__item">
                    <img
                        src={productCurrent.thumbnail}
                        alt={productCurrent.thumbnail}
                        width="120px"
                    />
                    <h5 className="text-overflow">
                        <Link to={'/products/' + product.id}>
                            {product.name}
                        </Link>
                    </h5>
                </td>
                <td className="shoping__cart__price">
                    {numberToVndString(productCurrent.price)}
                </td>
                <td className="shoping__cart__quantity">
                    <div className="quantity">
                        <div className="pro-qty">
                            <span
                                className="dec qtybtn"
                                onClick={handleBtnClick}
                            >
                                -
                            </span>
                            <input
                                ref={inputRef}
                                type="number"
                                value={quantity === 0 ? '' : quantity}
                                onInput={handleQuantityChange}
                                onBlur={handleQuantityBlur}
                            />
                            <span
                                className="inc qtybtn"
                                onClick={handleBtnClick}
                            >
                                +
                            </span>
                        </div>
                    </div>
                </td>
                <td className="shoping__cart__total">
                    {numberToVndString(quantity * product.price)}
                </td>
                <td className="shoping__cart__item__close">
                    <span className="icon_close" onClick={confirmRemove}>
                        <FaTimes
                            className="svg-fa"
                            size={16}
                            onClick={confirmRemove}
                        />
                    </span>
                </td>
            </tr>
        </>
    );
};
export default memo(Product);
