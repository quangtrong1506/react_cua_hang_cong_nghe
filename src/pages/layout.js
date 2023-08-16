import Footer from '../components/_common/footer/footer';
import Header from '../components/_common/header/Header';

import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import pageApis from '../api/shop/page';
import '../assets/css/style.css';
import { initCategories } from '../features/page/categorySlice';

export default function Layout() {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const categories = await pageApis.getCategories();
            if (categories.success) {
                dispatch(initCategories(categories.data));
            }
        })();
    }, []);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
