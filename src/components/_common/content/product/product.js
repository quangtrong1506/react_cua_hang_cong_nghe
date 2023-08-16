import { useEffect, useRef } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { addToCart } from '../../../../features/page/cartSlice';
import { numberToVndString } from '../../../../helpers/convert';
import { getStyleBgImage } from '../../../../helpers/image';

const MySwal = withReactContent(Swal);
function Product({
    thumbnail = '',
    price = 0,
    name = '',
    categories = [],
    url = '',
    discountPercentage = 0,
    status = 0,
    id,
}) {
    const linkRef = useRef();
    const addToCartRef = useRef();
    const dispatch = useDispatch();
    price = price * 23000;
    //0 bình thường 1 giảm giá 2 hết hàng 3 ngừng kinh doanh
    status = 1;
    let statusObj = {
        className: 'featured__item__status',
        title: '',
    };
    if (status === 1 && discountPercentage > 0) {
        statusObj.className += ' badge text-bg-danger';
        statusObj.title = '-' + discountPercentage + '%';
    } else if (status === 2) {
        statusObj.className += ' badge het_hang';
        statusObj.title = 'Hết hàng';
    } else if (status === 3) {
        statusObj.className += ' badge ngung_kinh_doanh';
        statusObj.title = 'Ngừng kinh doanh';
    }
    useEffect(() => {
        linkRef.current.addEventListener('click', (e) => {
            e.preventDefault();
            window.navigator.share({
                text: linkRef.current.getAttribute('data-title'),
                title: 'Chia sẻ sản phẩm',
                url: linkRef.current.href,
            });
        });
    }, []);
    useEffect(() => {
        addToCartRef.current.addEventListener('click', (e) => {
            e.preventDefault();
            dispatch(
                addToCart({
                    id: id,
                    name: name,
                    quantity: 1,
                    price: price,
                    url: url,
                    discountPercentage,
                    status: status,
                    thumbnail,
                })
            );
            MySwal.fire(
                '',
                'Đã thêm sản phẩm ' + name + ' vào giỏ hàng',
                'success'
            );
        });
    }, [discountPercentage, dispatch, id, name, price, status, thumbnail, url]);
    return (
        <>
            <div
                className={
                    'col-lg-3 col-md-4 col-sm-4 col-6 mix ' +
                    categories.join(' ')
                }
            >
                <div className="featured__item">
                    <div
                        className="featured__item__pic set-bg"
                        style={getStyleBgImage(thumbnail)}
                    >
                        <ul className="featured__item__pic__hover">
                            <li>
                                <Link to="#" ref={linkRef} data-title={name}>
                                    <FaShareAlt className="svg-fa" />
                                </Link>
                            </li>
                            <li>
                                <Link to="#" ref={addToCartRef} data-title={id}>
                                    <FaCartShopping className="svg-fa" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="featured__item__text">
                        <h6>
                            <Link to={url}>{name}</Link>
                        </h6>
                        <h5>{numberToVndString(price)}</h5>
                    </div>
                    <span className={statusObj.className}>
                        {statusObj.title}
                    </span>
                </div>
            </div>
        </>
    );
}

export default Product;
