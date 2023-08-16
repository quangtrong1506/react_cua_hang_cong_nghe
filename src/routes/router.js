import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Contact from '../components/_common/content/contact/contact';
import Index from '../pages';
import AuthLayout from '../pages/auth/authLayout';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ErrorPage from '../pages/error-page';
import Layout from '../pages/layout';
import News from '../pages/news/index';
import ProductDetail from '../pages/products/productDetail';
import Products from '../pages/products/products';
import User from '../pages/user';
import Cart from '../pages/user/cart/cart';
import Checkout from '../pages/user/checkout/checkout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: 'products',
                children: [
                    {
                        index: true,
                        element: <Products />,
                    },
                    {
                        path: ':slug',
                        element: <ProductDetail />,
                    },
                ],
            },
            {
                path: 'news',
                children: [
                    {
                        index: true,
                        element: <News />,
                    },
                ],
            },
            {
                path: 'contact',
                children: [
                    {
                        index: true,
                        element: <Contact />,
                    },
                ],
            },
        ],
    },
    // Form user
    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'forget-password',
                element: <Login />,
            },
        ],
    },
    // user
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: <User />,
                    },
                    {
                        path: 'cart',
                        element: <Cart />,
                    },
                    {
                        path: 'checkout',
                        element: <Checkout />,
                    },
                    {
                        path: 'orders/:id',
                        element: <User />,
                    },
                    {
                        path: ':path',
                        element: <User />,
                    },
                ],
            },
        ],
    },
]);
export default router;
