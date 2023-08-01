//? Components
import Header from '../components/_common/header/Header';

//
import { Outlet, useNavigate } from 'react-router-dom';
//? react-toast | toast message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

//? CSS
import '../assets/css/bootstrap.min.css';
import '../assets/css/elegant-icons.css';
import '../assets/css/font-awesome.min.css';
import '../assets/css/jquery-ui.min.css';
import '../assets/css/nice-select.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/style.css';
import Footer from '../components/_common/footer/footer';

export default function Layout() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['user_token']);
    let navigate = useNavigate();

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
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer
                position="top-right"
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
