import { useEffect } from 'react';
import { USER } from '../../../../helpers/constants';
import userApis from '../../../../api/baseAdmin/user';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function UserFormElement({ isUpdate = false }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
            phone: '',
            level: USER.levels.user.value.toString(),
        },
    });
    let urlParams = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (isUpdate) {
            (async () => {
                const userResponse = await userApis.show(urlParams.userId);

                if (userResponse.success) {
                    setValue('name', userResponse.data.name);
                    setValue('email', userResponse.data.email);
                    setValue('phone', userResponse.data.phone);
                    setValue('level', userResponse.data.level.toString());
                }
            })();
        }
    }, [isUpdate, urlParams]);

    const store = async (data) => {
        const userResponse = await userApis.store(data);

        if (userResponse.success) {
            navigate('/users');
            toast.success(() => (
                <p>
                    Thêm mới user <b>{userResponse.data.name}</b> thành công!
                </p>
            ));

            return;
        }

        if (!userResponse.errors.length) {
            toast.error(() => (
                <p>
                    Thêm mới user <b>{data.name}</b> thất bại!
                </p>
            ));

            return;
        }
        userResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            setError(key, {
                type: 'server',
                message: value.message,
            });
        });
    };

    const update = async (data) => {
        const userResponse = await userApis.update(urlParams.userId, data);

        if (userResponse.success) {
            toast.success(() => (
                <p>
                    Chỉnh sửa user <b>{data.name}</b> thành công!
                </p>
            ));

            return;
        }

        if (!userResponse.errors.length) {
            toast.error(() => (
                <p>
                    Chỉnh sửa user <b>{data.name}</b> thất bại!
                </p>
            ));
        }
        userResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            setError(key, {
                type: 'server',
                message: value.message,
            });
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(isUpdate ? update : store)}>
                <div className={'p-3 col-6'}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Họ tên <span className={'text-danger fw-bold'}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            {...register('name', {
                                required: 'Họ tên không được để trống',
                                maxLength: {
                                    value: 50,
                                    message: 'Họ tên không được lớn hơn 50 ký tự',
                                },
                            })}
                        />
                        {errors.name && (
                            <p className={'text-danger fw-bold'}>{errors.name.message}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Email <span className={'text-danger fw-bold'}>*</span>
                        </label>
                        <input
                            disabled={isUpdate}
                            type="email"
                            className="form-control"
                            id="inputName"
                            {...register('email', {
                                required: 'Email không được để trống',
                                maxLength: {
                                    value: 50,
                                    message: 'Email không được lớn hơn 50 ký tự',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className={'text-danger fw-bold'}>{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label">
                            Số điện thoại <span className={'text-danger fw-bold'}>*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPhone"
                            {...register('phone', {
                                required: 'Số điện thoại không được để trống',
                                maxLength: {
                                    value: 11,
                                    message: 'Số điện thoại không được lớn hơn 11 ký tự',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Số điện thoại không được ít hơn 10 ký tự',
                                },
                            })}
                        />
                        {errors.phone && (
                            <p className={'text-danger fw-bold'}>{errors.phone.message}</p>
                        )}
                    </div>
                    <div className={'mb-3'}>
                        <div>
                            <label className="form-label">
                                Phân quyền <span className={'text-danger fw-bold'}>*</span>
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="inputLevelAdmin"
                                value={USER.levels.admin.value.toString()}
                                {...register('level')}
                            />
                            <label className="form-check-label" htmlFor="inputLevelAdmin">
                                {USER.levels.admin.label}
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="inputLevelUser"
                                value={USER.levels.user.value.toString()}
                                {...register('level')}
                            />
                            <label className="form-check-label" htmlFor="inputLevelUser">
                                {USER.levels.user.label}
                            </label>
                        </div>
                        {errors.level && (
                            <p className={'text-danger fw-bold'}>{errors.level.message}</p>
                        )}
                    </div>
                </div>
                <div className="card-footer">
                    {(() => {
                        if (isUpdate) {
                            return <button className={'btn btn-success'}>Cập nhật</button>;
                        }

                        return <button className={'btn btn-primary'}>Thêm mới</button>;
                    })()}
                </div>
            </form>
        </>
    );
}
