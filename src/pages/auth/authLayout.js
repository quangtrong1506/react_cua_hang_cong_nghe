import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../assets/scss/auth.scss';
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
                <img className="logo" src="/images/logo.png" alt="logo.png"></img>
            </div>
            <Outlet></Outlet>
        </div>
    );
}
