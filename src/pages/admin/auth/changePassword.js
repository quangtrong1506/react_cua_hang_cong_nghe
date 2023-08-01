import {useForm} from "react-hook-form";
import authApis from "../../api/baseAdmin/auth";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";

export default function ChangePassword() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        watch
    } = useForm();
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const changePassword = async (data) => {
        const changePasswordRequest = await authApis.changePassword({
            token: searchParams.get('token'),
            password: data.password
        });

        if (changePasswordRequest.success) {
            toast.success(() => <p>Thay đổi mật khẩu thành công!</p>);
            navigate('/login');

            return;
        }

        if (!changePasswordRequest.errors.length) {
            toast.success(() => <p>Thay đổi mật khẩu thất bại!</p>);

            return
        }
        changePasswordRequest.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    useEffect( () => {
        (
            async () => {
                const confirmAccountRequest = await authApis.confirmAccount({
                    token: searchParams.get('token')
                });

                if (!confirmAccountRequest.success) {
                    toast.error(() => <p>{ confirmAccountRequest.message }</p>);
                    navigate('/login');
                }
            }
        )()
    }, []);

    return (
        <>
            <h2 className={"text-center"}>Thay đổi mật khẩu</h2>
            <form className={"pb-3"} onSubmit={handleSubmit(changePassword)}>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Mật khẩu mới</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {
                            ...register('password', {
                                required: 'Mật khẩu không được để trống',
                                maxLength: {
                                    value: 20,
                                    message: "Mật khẩu không được lớn hơn 20 ký tự"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu không được ít hơn 6 ký tự"
                                }
                            })
                        }
                    />
                    {errors.password && <p className={'text-danger fw-bold'}>{errors.password.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        {
                            ...register('confirm_password', {
                                required: 'Mật khẩu không được để trống',
                                maxLength: {
                                    value: 20,
                                    message: "Mật khẩu không được lớn hơn 20 ký tự"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu không được ít hơn 6 ký tự"
                                },
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return "Nhập lại mật khẩu không chính xác";
                                    }
                                },
                            })
                        }
                    />
                    {errors.confirm_password && <p className={'text-danger fw-bold'}>{errors.confirm_password.message}</p>}
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-success">Lưu</button>
                </div>
            </form>
        </>
    );
}