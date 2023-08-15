import { useCookies } from 'react-cookie';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../assets/scss/auth.scss';
import { FaArrowLeft, FaChevronLeft } from 'react-icons/fa6';
export default function AuthLayout() {
    let navigate = useNavigate();
    const [cookies] = useCookies();

    // useEffect(() => {
    //     if (cookies.user_token) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className="auth-container">
            <div>
                <img
                    className="logo"
                    src="/images/logo.png"
                    alt="logo.png"
                ></img>
            </div>
            <Outlet></Outlet>
            <Link to={'/'} className="back--btn">
                <FaChevronLeft size={16} />
                Quay về trang chủ
            </Link>
        </div>
    );
}
