import Navigation from "../components/_common/navigation/navigation";
import MainSidebar from "../components/_common/mainSidebar/mainSidebar";
import MainFooter from "../components/_common/footer/footer";
import {Outlet, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {createAuthUser} from "../features/auth/authSlice";
import profileApis from "../api/baseAdmin/profile";

export default function Layout() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['user_token']);
    let navigate = useNavigate();

    useEffect( () => {
        if (!cookies.user_token) {
            navigate('/login');
        }
        if (!auth.user) {
            (
                async () => {
                    const profileResponse = await profileApis.show();

                    if (profileResponse.success) {
                        dispatch(createAuthUser(profileResponse.data))
                    }
                }
            )()
        }
    }, [cookies]);

    return (
        <>
            <div id="main" className="sidebar-mini layout-fixed">
                <div className="wrapper container-fluid p-0">
                    <Navigation />
                    <MainSidebar />
                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                    <MainFooter />
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
                        style={{ width: "400px" }}
                    />
                </div>
            </div>
        </>
    );
}