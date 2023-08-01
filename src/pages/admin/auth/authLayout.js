import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
    let navigate = useNavigate();
    const [cookies] = useCookies();

    // useEffect(() => {
    //     if (cookies.user_token) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <>
            <div
                className={
                    'container-fluid row login-page justify-content-center align-items-center'
                }
            >
                <div className="card login-content p-0 bg-light">
                    <div className="card-body">
                        <div className={'text-center'}>
                            <img
                                src="/images/logo.png"
                                alt="AdminLTE Logo"
                                className="brand-image image-circle elevation-3"
                            />
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: '400px' }}
            />
        </>
    );
}
