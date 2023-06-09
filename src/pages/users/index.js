import ContentHeader from "../../components/_common/content/contentHeader";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import userApis from "../../api/baseAdmin/user";
import {PAGINATION, USER} from "../../helpers/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import UserImport from "./elements/userImport";
import UserExport from "./elements/userExport";
import CustomPagination from "../../components/_common/customPagination";

const userIndexSwal = withReactContent(Swal);
export default function UserIndex() {
    const {
        register,
        handleSubmit,
        getValues
    }= useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            level: ''
        }
    });
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Quản lý users',
            link: 'users'
        },
    ]);
    const [parentTitle] = useState('Quản lý users');
    const [title] = useState('Danh sách users');
    const [users, setUsers] = useState({});
    const currentPage = useRef(PAGINATION.startPage);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = (data = {}, page = PAGINATION.startPage) => {
        if (page !== currentPage.current) {
            currentPage.current = page;
        }

        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }

                const usersResponse = await userApis.index(data, page);

                if (usersResponse.success) {
                    setUsers(usersResponse.data);
                }
            }
        )()
    };

    const handleDelete = async (userId) => {
        userIndexSwal.fire({
            title: 'Bạn có muốn xóa user này không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteUser = await userApis.destroy(userId);

                if (deleteUser.success) {
                    toast.success(() => <p>Xóa user thành công!</p>);
                    getUsers(getValues(), currentPage.current)
                }
            }
        })
    };

    const filter = (data) => {
        getUsers(data)
    };

    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle}/>
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h3 className="card-title">Tìm kiếm</h3>
                                </div>
                                <div className={'card-body'}>
                                    <form onSubmit={handleSubmit(filter)}>
                                        <div className={"row mb-3"}>
                                            <div className="col-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={"Họ tên"}
                                                    {...register('name', {
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Họ tên không được lớn hơn 50 ký tự"
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder={"Email"}
                                                    {...register('email', {
                                                        maxLength: {
                                                            value: 50,
                                                            message: "Email không được lớn hơn 50 ký tự"
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={"Số điện thoại"}
                                                    {...register('phone', {
                                                        maxLength: {
                                                            value: 11,
                                                            message: "Số điện thoại không được lớn hơn 11 ký tự"
                                                        },
                                                        minLength: {
                                                            value: 10,
                                                            message: "Số điện thoại không được ít hơn 10 ký tự"
                                                        }
                                                    })}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <select className="form-select" aria-label="Phân quyền"
                                                        {...register('level')}
                                                >
                                                    <option value={''}>Phân quyền</option>
                                                    <option
                                                        value={USER.levels.super_admin.value.toString()}
                                                    >
                                                        {USER.levels.super_admin.label}
                                                    </option>
                                                    <option value={USER.levels.admin.value.toString()}>{USER.levels.admin.label}</option>
                                                    <option value={USER.levels.user.value.toString()}>{USER.levels.user.label}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className={"row"}>
                                            <div className="col-auto">
                                                <button type="submit" className="btn btn-primary me-2">
                                                    Tìm kiếm
                                                </button>
                                                <UserImport getUsers={getUsers}></UserImport>
                                                <UserExport data={getValues()}></UserExport>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <h3 className="card-title">{ title }</h3>
                                </div>
                                <div className={'card-body'}>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className={'text-center'}>
                                            <th style={{width:10}}>#</th>
                                            <th>Họ tên</th>
                                            <th>Email</th>
                                            <th>Số điện thoại</th>
                                            <th>Phân quyền</th>
                                            <th style={{width:`15%`}}>Label</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            users.docs && users.docs.map( (user, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            { index + 1 }
                                                        </td>
                                                        <td>
                                                            { user.name }
                                                        </td>
                                                        <td>
                                                            { user.email }
                                                        </td>
                                                        <td>
                                                            { user.phone }
                                                        </td>
                                                        <td>
                                                            {
                                                                Object.values(USER.levels).find( level => level.value === user.level).label
                                                            }
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <button type="button" className="btn btn-danger me-2" onClick={() => handleDelete(user._id)}>Xóa</button>
                                                            <Link to={ user._id + '/edit' } className="btn btn-success">Chỉnh sửa</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    <CustomPagination
                                        page={users.page}
                                        pages={users.pages}
                                        onPageChange={page => getUsers(getValues(), page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}