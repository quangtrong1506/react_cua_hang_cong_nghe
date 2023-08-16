import { memo, useEffect, useRef } from 'react';
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
        setPageTitle('Thông tin cá nhân');
    }, []);
    const inputAvatarRef = useRef(null);
    function saveProfile(data) {
        if (data.phone.match(/[^0-9]/g))
            setError('phone', {
                message: 'Số điện thoại không đúng định dạng',
            });
    }
    function handleChangeAvatar(e) {
        const file = e.target.files?.[0];
        if (file) {
            document.getElementById('avatar-overview').src =
                URL.createObjectURL(file);
            inputAvatarRef.current = file;
        }
    }
    return (
        <>
            <div className="row user-info__info">
                <div className="col-lg-9 col-md-12">
                    <div className="edit-info">
                        <form
                            className="pb-3"
                            onSubmit={handleSubmit(saveProfile)}
                        >
                            <div className="mb-3 mt-3">
                                <h3>Thông tin cá nhân</h3>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputName"
                                    className="form-label"
                                >
                                    Họ & Tên
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    {...register('name', {
                                        required:
                                            'Họ & tên thoại không được để trống',
                                    })}
                                />
                                {errors.name && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputEmail"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputEmail"
                                    readOnly={true}
                                    value="quangtrong@gmail.com"
                                    disabled={true}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputPhone"
                                    className="form-label"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    id="inputPhone"
                                    {...register('phone', {
                                        required:
                                            'Số điện thoại không được để trống',
                                        maxLength: {
                                            value: 11,
                                            message:
                                                'Số điện thoại không được lớn hơn 11 ký tự',
                                        },
                                        minLength: {
                                            value: 9,
                                            message:
                                                'Số điện thoại không được ít hơn 9 ký tự',
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputAddress"
                                    {...register('address', {
                                        required: 'Địa chỉ không được để trống',
                                    })}
                                />
                                {errors.address && (
                                    <p className="mt-2 text-danger fw-bold">
                                        {errors.address.message}
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
                <div className="user-profile col-lg-3 col-md-12">
                    <div className="avatar">
                        <img id="avatar-overview" src="" alt="" />
                    </div>
                    <div className="button">
                        <input
                            type="file"
                            id="upLoadAvatar"
                            style={{ display: 'none' }}
                            accept=".jpg,.png,.jpeg"
                            onChange={handleChangeAvatar}
                        />
                        <label className="btn" htmlFor="upLoadAvatar">
                            Upload
                        </label>
                        <br />
                        <span>Định dạng cho phép: jpg, jepg, png</span>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(Profile);
