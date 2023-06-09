import {useForm} from "react-hook-form";
import authApis from "../../api/baseAdmin/auth";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import moment from "moment";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm();
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user_token']);
    const login = async (data) => {
        const loginResponse = await authApis.login(data);

        if (loginResponse.success) {
            setCookie('user_token', loginResponse.data.user_token, { path: '/' , expires: moment().add(1, 'months').toDate()})
            navigate('/');

            return;
        }
        loginResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    return (
        <>
            <form className={"pb-3"} onSubmit={handleSubmit(login)}>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        {...register('phone', {
                            required:'Số điện thoại không được để trống',
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
                    {errors.phone && <p className={'text-danger fw-bold'}>{errors.phone.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Mật khẩu</label>
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
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-primary">Đăng nhập</button>
                </div>
            </form>
        </>
    );
}