import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { addToCart } from '../../../../features/page/cartSlice';
const MySwal = withReactContent(Swal);
const Button = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(
            addToCart({
                ...product,
                quantity,
            })
        );
        MySwal.fire(
            '',
            'Đã thêm sản phẩm ' + product.title + ' vào giỏ hàng',
            'success'
        );
    };
    const handleByNow = (e) => {
        e.preventDefault();
    };
    const handleInput = (e) => {
        let num = e.target.value;
        if (!isNaN(+num) || !e.target.value.toString().match('e')) {
            if (+num > product.stock) {
                MySwal.fire({
                    html:
                        'Bạn chỉ có thể nhập số lượng nhỏ hơn hoặc bằng ' +
                        product.stock,
                    icon: 'warning',
                });
                setQuantity(product.stock);
            } else setQuantity(num);
        } else {
            MySwal.fire({
                html: 'Vui lòng nhập đúng định dạng',
                icon: 'warning',
            });
        }
    };
    const handleQtyClick = (e) => {
        if (e.target.classList.contains('inc')) {
            if (quantity + 1 > product.stock)
                MySwal.fire({
                    html: 'Bạn đã nhập quá số lượng mà cửa hàng đang có',
                    icon: 'warning',
                });
            else setQuantity(parseInt(quantity) + 1);
        } else {
            if (quantity > 1) setQuantity(parseInt(quantity) - 1);
        }
    };
    return (
        <>
            <div className="product__details__quantity">
                <div className="quantity">
                    <div className="pro-qty">
                        <span className="dec qtybtn" onClick={handleQtyClick}>
                            -
                        </span>
                        <input
                            id="quantity-input"
                            type="text"
                            value={quantity}
                            onInput={handleInput}
                        />
                        <span className="inc qtybtn" onClick={handleQtyClick}>
                            +
                        </span>
                    </div>
                </div>
            </div>
            <Link href="#" className="primary-btn" onClick={handleAddToCart}>
                Thêm vào giỏ
            </Link>
            <Link href="#" className="primary-btn" onClick={handleByNow}>
                Mua ngay
            </Link>
        </>
    );
};
export default memo(Button);
