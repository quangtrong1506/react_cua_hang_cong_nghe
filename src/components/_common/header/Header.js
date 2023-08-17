import $ from 'jquery';
import { memo, useLayoutEffect } from 'react';
import {
    FaBagShopping,
    FaBars,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaUser,
} from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { numberToVndString } from '../../../helpers/convert';
import HeaderCategories from './headerCategories';
import HeaderSearch from './headerSearch';
function Header() {
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    let navigate = useNavigate();
    function openNav() {
        $('.humberger__menu__wrapper').addClass(
            'show__humberger__menu__wrapper'
        );
        $('.humberger__menu__overlay').addClass('active');
        $('body').addClass('over_hid');
    }
    function handlerOverlayOnClick() {
        $('.humberger__menu__wrapper').removeClass(
            'show__humberger__menu__wrapper'
        );
        $('.humberger__menu__overlay').removeClass('active');
        $('body').removeClass('over_hid');
    }
    useLayoutEffect(() => {
        handlerOverlayOnClick();
        return () => {};
    }, [navigate]);
    const User = () => {
        if (user)
            return (
                <>
                    <Link className="user-name" to="/">
                        <FaUser className="svg-fa" />
                        {user.name}
                    </Link>
                    <Link to="/logout" className="logout">
                        Đăng xuất
                    </Link>
                </>
            );
        return (
            <>
                <Link className="user-name" to="/login">
                    Đăng nhập
                </Link>
            </>
        );
    };
    const User2 = () => {
        if (user)
            return (
                <span>
                    <Link to={'/user'}>
                        <FaUser size={12} style={{ marginBottom: '3px' }} />
                        {user.name}
                    </Link>
                    <ul>
                        <li>
                            <a href="/user">Thông tin tài khoản</a>
                        </li>
                        <li>
                            <a href="/logout">Đăng xuất</a>
                        </li>
                    </ul>
                </span>
            );
        return (
            <>
                <span>
                    <Link to="/login">Đăng nhập</Link>
                </span>
            </>
        );
    };
    return (
        <>
            <div
                className="humberger__menu__overlay"
                onClick={handlerOverlayOnClick}
            ></div>
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <Link to="/">
                        <img src="/images/logo.png" alt="" />
                    </Link>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li>
                            <Link to={'/user/cart'}>
                                <FaBagShopping /> <span>{cart?.count}</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__cart__price">
                        item: <span>{numberToVndString(cart?.total)}</span>
                    </div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__auth">
                        <User />
                    </div>
                </div>
                <nav className="humberger__menu__nav mobile-menu">
                    <ul>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/products">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link to="/news">Tin tức</Link>
                        </li>
                        <li>
                            <Link to="/contact">Liên hệ</Link>
                        </li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap">
                    <ul>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/products">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link to="/news">Tin tức</Link>
                        </li>
                        <li>
                            <Link to="/contact">Liên hệ</Link>
                        </li>
                    </ul>
                </div>
                <div className="header__top__right__social">
                    <a href="/">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a href="/">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a href="/?">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="/?">
                        <i className="fa fa-pinterest-p"></i>
                    </a>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li>
                            <FaEnvelope /> ycn.support@gmail.com
                        </li>
                        <li>Số 30 Ngõ 134, Nguyên Xá, Từ Liêm, Hà Nội</li>
                    </ul>
                </div>
            </div>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <FaEnvelope /> ycn.support@gmail.com
                                        </li>
                                        <li>
                                            Số 30 Ngõ 134, Nguyên Xá, Từ Liêm,
                                            Hà Nội
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="/?">
                                            <FaFacebookF />
                                        </a>
                                        <a href="/?">
                                            <FaTwitter />
                                        </a>
                                    </div>
                                    <div className="header__top__right__auth">
                                        <User2 />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <Link to="/">
                                    <img
                                        src="/images/logo.png"
                                        alt=""
                                        width="auto"
                                        height="auto"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li>
                                        <Link to="/">Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link to="/products">Sản phẩm</Link>
                                    </li>
                                    <li>
                                        <Link to="/news">Tin tức</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Liên hệ</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="header__cart">
                                <ul>
                                    <li>
                                        <Link to="/user/cart">
                                            <FaBagShopping />{' '}
                                            <span>{cart?.count}</span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="header__cart__price">
                                    <span>
                                        {numberToVndString(cart?.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open" onClick={openNav}>
                        <FaBars />
                    </div>
                </div>
            </header>
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <HeaderCategories></HeaderCategories>
                        </div>
                        <div className="col-lg-9">
                            <HeaderSearch />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Header);
