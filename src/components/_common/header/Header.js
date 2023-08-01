import { Link } from 'react-router-dom';
import { memo, useEffect } from 'react';
import $ from 'jquery';

//element
import HeaderSearch from './headerSearch';
import HeaderCategories from './headerCategories';
import { FaEnvelope, FaFacebookF, FaTwitter, FaUser } from 'react-icons/fa6';
function Header() {
    function categoriesUlClick() {
        $('.hero__categories ul').slideToggle(400);
    }
    function openNav() {
        $('.humberger__menu__wrapper').addClass('show__humberger__menu__wrapper');
        $('.humberger__menu__overlay').addClass('active');
        $('body').addClass('over_hid');
    }
    function handlerOverlayOnClick() {
        $('.humberger__menu__wrapper').removeClass('show__humberger__menu__wrapper');
        $('.humberger__menu__overlay').removeClass('active');
        $('body').removeClass('over_hid');
    }
    useEffect(() => {
        document.querySelector('.hero__categories ul').addEventListener('mouseleave', () => {
            document.querySelector('.hero__categories ul').style.dispay = 'none';
        });
        return () => {};
    }, []);
    return (
        <>
            <div className="humberger__menu__overlay" onClick={handlerOverlayOnClick}></div>
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <Link to="/">
                        <img src="/images/logo.png" alt="" />
                    </Link>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li>
                            <Link to={'#'}>
                                <i className="fa fa-heart"></i> <span>1</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'#'}>
                                <i className="fa fa-shopping-bag"></i> <span>3</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__cart__price">
                        item: <span>150,000 ₫</span>
                    </div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__auth">
                        <a className="user-name" href="/">
                            <i className="fa fa-user"></i>Quang Trọng
                        </a>
                        <a href="/logout" className="logout">
                            Đăng xuất
                        </a>
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
                                        <li>Số 30 Ngõ 134, Nguyên Xá, Từ Liêm, Hà Nội</li>
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
                                        <span href="/?">
                                            <FaUser size={12} style={{ marginBottom: '3px' }} />
                                            Quang Trọng
                                            <ul>
                                                <li>
                                                    <a href="/?">Thông tin tài khoản</a>
                                                </li>
                                                <li>
                                                    <a href="/logout">Đăng xuất</a>
                                                </li>
                                            </ul>
                                        </span>
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
                                    <img src="/images/logo.png" alt="" width="auto" height="auto" />
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
                                    {/* <li>
                                        <a href="/?">
                                            <i className="fa fa-heart"></i> <span>1</span>
                                        </a>
                                    </li> */}
                                    <li>
                                        <a href="./shoping-cart.html">
                                            <i className="fa fa-shopping-bag"></i> <span>3</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="header__cart__price">
                                    <span>150,000 ₫</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open" onClick={openNav}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all" onClick={categoriesUlClick}>
                                    <i className="fa fa-bars"></i>
                                    <span>Danh mục</span>
                                </div>
                                <HeaderCategories></HeaderCategories>
                            </div>
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
