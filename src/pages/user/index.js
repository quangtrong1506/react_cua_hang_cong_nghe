import { memo, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OrderDetailElement from '../../components/_common/user/orderDetail';
import OrdersElement from '../../components/_common/user/orders';
import PasswordElement from '../../components/_common/user/password';
import ProfileElement from '../../components/_common/user/profile';
const Profile = () => {
    const navigate = useNavigate();
    const { path, id } = useParams();
    console.log(path);
    useEffect(() => {
        let arrList = document.querySelectorAll('section.user-info .nav ul li');
        let errorPath = true;
        for (let i = 0; i < arrList.length; i++) {
            const element = arrList[i];
            if (element.firstElementChild.href.split('/user/')?.[1] === path) {
                errorPath = false;
            }
        }
        if (errorPath && !id) navigate('/user/profile');
        arrList.forEach((element) => {
            element.classList.remove('active');
            if (element.firstElementChild.href.match(path) && !id) {
                element.classList.add('active');
            }
        });
    }, [id, navigate, path]);
    return (
        <>
            <section className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-4">
                            <div className="nav">
                                <ul>
                                    <li>
                                        <Link to="/user/profile">
                                            Thông tin cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/user/password">
                                            Mật khẩu
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/user/cart">Giỏ hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="/user/orders">Đơn hàng</Link>
                                    </li>
                                    <li>
                                        <Link to="/user/logout">Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9 col-sm-6 col-md-8">
                            {path === 'profile' && <ProfileElement />}
                            {path === 'password' && <PasswordElement />}
                            {path === 'orders' && !id && <OrdersElement />}
                            {id && <OrderDetailElement />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default memo(Profile);
