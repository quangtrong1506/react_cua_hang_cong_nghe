import Navigation from '../../components/admin/navigation/navigation';
import MainSidebar from '../../components/admin/mainSidebar/mainSidebar';
import MainFooter from '../../components/admin/footer/footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../../assets/scss/admin/index.scss';
export default function Layout() {
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
                        style={{ width: '400px' }}
                    />
                </div>
            </div>
        </>
    );
}
