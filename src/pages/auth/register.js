import { useForm } from 'react-hook-form';
// import authApis from '../../api/shop/auth';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    let navigate = useNavigate();
    useEffect(() => {
        document.title = 'Đăng ký';
    }, []);
    const [cookies, setCookie] = useCookies(['user_token']);
    const handleRegister = async (data) => {
        console.log(data);
    };

    return (
        <>
            <form className={'pb-3'} onSubmit={handleSubmit(handleRegister)}>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        {...register('phone', {
                            required: 'Số điện thoại không được để trống',
                            maxLength: {
                                value: 11,
                                message:
                                    'Số điện thoại không được lớn hơn 11 ký tự',
                            },
                            minLength: {
                                value: 10,
                                message:
                                    'Số điện thoại không được ít hơn 10 ký tự',
                            },
                        })}
                    />
                    {errors.phone && (
                        <p className={'text-danger fw-bold'}>
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        {...register('email', {
                            required: 'Email không được để trống',
                        })}
                    />
                    {errors.email && (
                        <p className={'text-danger fw-bold'}>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {...register('password', {
                            required: 'Mật khẩu không được để trống',
                            maxLength: {
                                value: 20,
                                message: 'Mật khẩu không được lớn hơn 20 ký tự',
                            },
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu không được ít hơn 6 ký tự',
                            },
                        })}
                    />
                    {errors.password && (
                        <p className={'text-danger fw-bold'}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {...register('password', {
                            required: 'Mật khẩu không được để trống',
                            maxLength: {
                                value: 20,
                                message: 'Mật khẩu không được lớn hơn 20 ký tự',
                            },
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu không được ít hơn 6 ký tự',
                            },
                        })}
                    />
                    {errors.password && (
                        <p className={'text-danger fw-bold'}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-primary">
                        Đăng nhập
                    </button>
                </div>
            </form>
            <div className="d-flex justify-content-between ">
                <Link to={'/'} children="Quên mật khẩu?" />
                <Link to={'/login'} children="Đăng nhập" />
            </div>
        </>
    );
}
