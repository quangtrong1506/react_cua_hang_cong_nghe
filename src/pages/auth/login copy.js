import { useForm } from 'react-hook-form';
import authApis from '../../api/baseAdmin/auth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user_token']);
    const login = async (data) => {
        console.log(data);
    };

    return (
        <>
            <form>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        {...register('email', {
                            required: 'Email không được để trống',
                        })}
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div className=" text-center">
                    <button type="submit" class="btn btn-primary">
                        Đăng nhập
                    </button>
                </div>
            </form>
        </>
    );
}
