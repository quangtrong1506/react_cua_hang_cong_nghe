import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faUsers, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link, NavLink } from 'react-router-dom';

export default function MainSidebar() {
    return (
        <>
            <div className="main-sidebar sidebar-dark-primary">
                <Link to="/admin" className="brand-link">
                    <img
                        src="/images/logo.png"
                        alt="AdminLTE Logo"
                        className="brand-image image-circle elevation-3"
                    />
                    <span className="brand-text fw-light">Base Admin</span>
                </Link>
                <div className="sidebar">
                    <div className="sidebar-content">
                        {/* Sidebar User Panel */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img
                                    src="https://i.ibb.co/XXywKfL/logo.png"
                                    className="img-circle elevation-2"
                                    alt="User"
                                />
                            </div>
                            <div className="info">
                                <NavLink to={'profile'} className={'nav-link'} end>
                                    Quang Trọng
                                </NavLink>
                            </div>
                        </div>

                        {/* Sidebar menu */}
                        <nav className="mt-2 sidebar-menu">
                            <ul
                                className={'nav nav-pills nav-sidebar flex-column'}
                                data-widget="treeview"
                                role="menu"
                                data-accordion="false"
                            >
                                <li className={'nav-item menu-open menu-is-opening'}>
                                    <Link to={'/admin'} className={'nav-link active'}>
                                        <FontAwesomeIcon icon={faUsers} className={'nav-icon'} />
                                        <p>
                                            Quản lý Users
                                            <FontAwesomeIcon
                                                icon={faAngleLeft}
                                                className={'right'}
                                            />
                                        </p>
                                    </Link>
                                    <ul className={'nav nav-treeview'}>
                                        <li className={'nav-item'}>
                                            <NavLink to={'/admin/users'} className={'nav-link'} end>
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    className={'nav-icon'}
                                                />
                                                <p>Danh sách Users</p>
                                            </NavLink>
                                        </li>
                                        <li className={'nav-item'}>
                                            <NavLink
                                                to={'/admin/users/create'}
                                                className={'nav-link'}
                                                end
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    className={'nav-icon'}
                                                />
                                                <p>Thêm mới User</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className={'nav-item menu-open menu-is-opening'}>
                                    <Link to={'/admin'} className={'nav-link active'}>
                                        <FontAwesomeIcon
                                            icon={faCreditCard}
                                            className={'nav-icon'}
                                        />
                                        <p>
                                            Payments
                                            <FontAwesomeIcon
                                                icon={faAngleLeft}
                                                className={'right'}
                                            />
                                        </p>
                                    </Link>
                                    <ul className={'nav nav-treeview'}>
                                        <li className={'nav-item'}>
                                            <NavLink to={'payments'} className={'nav-link'} end>
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    className={'nav-icon'}
                                                />
                                                <p>Tạo payment</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className={'nav-item menu-open menu-is-opening'}>
                                    <Link to={'/admin'} className={'nav-link active'}>
                                        <FontAwesomeIcon icon={faMessage} className={'nav-icon'} />
                                        <p>
                                            Chat
                                            <FontAwesomeIcon
                                                icon={faAngleLeft}
                                                className={'right'}
                                            />
                                        </p>
                                    </Link>
                                    <ul className={'nav nav-treeview'}>
                                        <li className={'nav-item'}>
                                            <NavLink to={'chat'} className={'nav-link'} end>
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    className={'nav-icon'}
                                                />
                                                <p>Chat box</p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
