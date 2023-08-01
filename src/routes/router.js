import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Contact from '../components/_common/content/contact/contact';
import News from '../components/_common/content/news/news';
import Products from '../components/_common/content/products/products';
import Index from '../pages';
import AdminLayout from '../pages/admin/adminLayout';
import AuthAuthLayout from '../pages/admin/auth/authLayout';
import AdminLogin from '../pages/admin/auth/login';
import AdminIndex from '../pages/admin/index';
import AdminUserIndex from '../pages/admin/users';
import AdminUserCreate from '../pages/admin/users/create';
import AdminUserEdit from '../pages/admin/users/edit';
import AuthLayout from '../pages/auth/authLayout';
import Login from '../pages/auth/login';
import ErrorPage from '../pages/error-page';
import Layout from '../pages/layout';

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
        ],
    },
    // admin
    {
        path: '/',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'admin',
                children: [
                    {
                        index: true,
                        element: <AdminIndex />,
                    },
                    {
                        path: 'dashboard',
                        element: <AdminIndex />,
                    },

                    {
                        path: 'users',
                        children: [
                            {
                                index: true,
                                element: <AdminUserIndex />,
                            },
                            {
                                path: 'create',
                                element: <AdminUserCreate />,
                            },
                            {
                                path: ':userId/edit',
                                element: <AdminUserEdit />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // admin form
    {
        path: '/',
        element: <AuthAuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'admin',
                children: [
                    {
                        path: 'login',
                        element: <AdminLogin />,
                    },
                ],
            },
        ],
    },
]);
export default router;
