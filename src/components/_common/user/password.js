import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setPageTitle } from '../../../helpers/setPageTitle';

const Profile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    useEffect(() => {
        setPageTitle('Thay đổi mật khẩu');
    }, []);
    function changePassword(data) {
        console.log(data);
    }
    return (
        <>
            <div className="row user-info__info">
                <div className="col-lg-12 col-md-12">
                    <div className="edit-info">
                        <form
                            className="pb-3"
                            onSubmit={handleSubmit(changePassword)}
                        >
                            <div className="mb-3">
                                <label
                                    htmlFor="inputPassword"
                                    className="form-label"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    {...register('password', {
                                        required:
                                            'Mật khẩu không được để trống',
                                    })}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputPassword"
                                    className="form-label"
                                >
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputNewPassword"
                                    {...register('newPassword', {
                                        required:
                                            'Mật khẩu mới không được để trống',
                                    })}
                                />
                                {errors.newPassword && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputConfirmPassword"
                                    className="form-label"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputConfirmPassword"
                                    {...register('confirmPassword', {
                                        required:
                                            'Xác nhận mật khẩu không được để trống',
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Lưu lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Profile);
