import Footer from '../components/_common/footer/footer';
import Header from '../components/_common/header/Header';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mainAxios from '../plugins/axios';
import pageApis from '../api/shop/page';
import { initCategories } from '../features/page/categorySlice';
import { showToast } from '../helpers/showToast';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/style.css';

export default function Layout() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // const [cookies, setCookie] = useCookies(['user_token']);
    // let navigate = useNavigate();
    // useEffect(() => {
    //     if (!cookies.user_token) {
    //         navigate('/login');
    //     }
    //     if (!auth.user) {
    //         (async () => {
    //             const profileResponse = await profileApis.show();

    //             if (profileResponse.success) {
    //                 dispatch(createAuthUser(profileResponse.data));
    //             }
    //         })();
    //     }
    // }, [cookies]);
    useEffect(() => {
        (async () => {
            const categories = await pageApis.getCategories();
            if (categories.success) {
                dispatch(initCategories(categories.data));
            }
        })();
    }, [dispatch]);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
            <ToastContainer />
        </>
    );
}
