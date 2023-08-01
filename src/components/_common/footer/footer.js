import { Link } from 'react-router-dom';
import { showToast } from '../../../helpers/showToast';
import SweetAlert2 from 'react-sweetalert2';
import { useState } from 'react';
const Validator = require('validator');
export default function Footer() {
    const [swalProps, setSwalProps] = useState({});
    function submitHandler(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        console.log(email);
        if (!Validator.isEmail(email)) {
            setSwalProps({
                show: true,
                title: '',
                text: 'Địa chỉ email không hợp lệ!',
                icon: 'info',
            });
        } else showToast({ message: 'ok', type: 'info' });
    }

    return (
        <>
            <footer className="footer spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__about__logo">
                                    <Link to="/">
                                        <img src="images/logo.png" alt="" />
                                    </Link>
                                </div>
                                <ul>
                                    <li>Địa chỉ: 48/134 Minh Khai, Từ Liêm, Hà Nội</li>
                                    <li>Phone: +84 389 619 050</li>
                                    <li>Email: ycn.support@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                            <div className="footer__widget">
                                <h6>Liên kết hữu ích</h6>
                                <ul>
                                    <li>
                                        <Link to="#">Về chúng tôi</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Thông tin về cửa hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Chính sách mua hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Thông tin giao hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Chính sách bảo mật</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Our Sitemap</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link to="#">Chúng tôi là ai</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Dịch vụ khác</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Dự sán</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Liên hệ</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="footer__widget">
                                <h6>Tham gia nhận thông tin mới nhất</h6>
                                <p>
                                    Nhập Email để đăng ký nhận thông báo về những sản phẩm mới nhất
                                </p>
                                <form action="/" method="POST" onSubmit={submitHandler}>
                                    <input type="text" placeholder="Nhập email" id="email" />
                                    <button type="submit" className="site-btn">
                                        Đăng ký
                                    </button>
                                </form>
                                <div className="footer__widget__social">
                                    <Link to="#">
                                        <i className="fa fa-facebook"></i>
                                    </Link>
                                    <Link to="#">
                                        <i className="fa fa-instagram"></i>
                                    </Link>
                                    <Link to="#">
                                        <i className="fa fa-twitter"></i>
                                    </Link>
                                    <Link to="#">
                                        <i className="fa fa-pinterest"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <SweetAlert2
                {...swalProps}
                didClose={() => {
                    setSwalProps({});
                }}
                onConfirm={() => {
                    setSwalProps({});
                }}
            ></SweetAlert2>
        </>
    );
}
