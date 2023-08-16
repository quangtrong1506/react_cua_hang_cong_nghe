import { memo, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import pageApis from '../../../api/shop/page';
import { numberToVndString } from '../../../helpers/convert';
const MySwal = withReactContent(Swal);
const Product = ({
    product,
    updateCartHandler,
    removeCartHandler,
    checkedHandler,
}) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const [productCurrent, setProduct] = useState(product);
    const inputRef = useRef();
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
    }, [product.id, product.stock, productCurrent.thumbnail]);

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
                updateCartHandler({
                    ...productCurrent,
                    quantity: productCurrent.stock,
                });
            } else {
                setQuantity(num);
                setQuantity(e.target.value);
                updateCartHandler({
                    ...productCurrent,
                    quantity: num,
                });
            }
        } else {
            MySwal.fire({
                html: 'Vui lòng nhập đúng định dạng',
                icon: 'warning',
            });
        }
    };
    const handleQuantityBlur = (e) => {
        let num = +e.target.value;
        if (!num) {
            setQuantity(1);
            updateCartHandler({ ...productCurrent, quantity: 1 });
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
                updateCartHandler({
                    ...productCurrent,
                    quantity: quantity + 1,
                });
            }
        } else {
            if (quantity > 1) {
                setQuantity(parseInt(quantity) - 1);
                updateCartHandler({
                    ...productCurrent,
                    quantity: quantity - 1,
                });
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
                removeCartHandler(productCurrent.id);
            }
        });
    }
    const handleCheckChange = (e) => {
        checkedHandler(productCurrent.id, !product.isChecked);
    };
    return (
        <>
            <tr>
                <td>
                    <label className="container">
                        <input
                            className="prod-select"
                            type="checkbox"
                            defaultChecked={product.isChecked ? 'checked' : ''}
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
