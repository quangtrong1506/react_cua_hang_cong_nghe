import ContentHeader from '../../../components/admin/content/contentHeader';
import UserFormElement from './elements/form';
import { useState } from 'react';

export default function UserEdit() {
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Quản lý users',
            link: 'users',
        },
    ]);
    const [parentTitle] = useState('Quản lý users');
    const [title] = useState('Chỉnh sửa user');

    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle} />
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header text-white bg-success">
                                    <h3 className="card-title">{title}</h3>
                                </div>
                                <UserFormElement isUpdate={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
