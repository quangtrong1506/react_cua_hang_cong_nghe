import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { setPageTitle } from '../../helpers/setPageTitle';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { numberToVndString } from '../../helpers/convert';

const CheckOut = () => {
    const checkout = useSelector((state) => state.checkout);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [address, setAddress] = useState({
        province: -1,
        district: -1,
        ward: -1,
    });
    const [payMethod, setPayMethod] = useState({
        value: 1,
        label: 'Thanh toán khi nhận hàng',
    });
    function handleClickHere(e) {
        e.preventDefault();
    }
    useEffect(() => {
        setPageTitle('Xác nhận đơn hàng');
        fetch('https://provinces.open-api.vn/api/')
            .then((response) => response.json())
            .then((result) => setProvinces(result));
    }, []);
    useEffect(() => {
        if (address.province !== -1)
            fetch(
                `https://provinces.open-api.vn/api/p/${address.province}?depth=2`
            )
                .then((response) => response.json())
                .then((result) => {
                    setDistricts(result.districts);
                });
        else setDistricts([]);
        setAddress((address) => {
            return {
                ...address,
                district: -1,
                ward: -1,
            };
        });
    }, [address.province]);
    useEffect(() => {
        if (address.district !== -1)
            fetch(
                `https://provinces.open-api.vn/api/d/${address.district}?depth=2`
            )
                .then((response) => response.json())
                .then((result) => {
                    setWards(result.wards);
                });
        else setWards([]);
        setAddress((address) => {
            return {
                ...address,
                ward: -1,
            };
        });
    }, [address.district]);
    function ProvincesSelect() {
        const newProvinces = [{ label: 'Lựa chọn Tỉnh/Thành phố', value: -1 }];
        provinces.forEach((province) => {
            newProvinces.push({ label: province.name, value: province.code });
        });
        return (
            <>
                <Select
                    options={newProvinces}
                    value={newProvinces.find(
                        (province) => province.value === address.province
                    )}
                    onChange={(select) => {
                        setAddress((address) => {
                            return {
                                ...address,
                                province: select.value,
                            };
                        });
                    }}
                />
            </>
        );
    }
    function DistrictsSelect() {
        const newDistricts = [{ label: 'Lựa chọn Quận/huyện', value: -1 }];
        districts.forEach((district) => {
            newDistricts.push({ label: district.name, value: district.code });
        });
        return (
            <>
                <Select
                    options={newDistricts}
                    value={newDistricts.find(
                        (district) => district.value === address.district
                    )}
                    onChange={(select) => {
                        setAddress((address) => {
                            return {
                                ...address,
                                district: select.value,
                            };
                        });
                    }}
                />
            </>
        );
    }
    function WardsSelect() {
        const newWards = [{ label: 'Lựa chọn Xã/Phường', value: -1 }];
        wards.forEach((district) => {
            newWards.push({ label: district.name, value: district.code });
        });
        return (
            <>
                <Select
                    options={newWards}
                    value={newWards.find((ward) => ward.value === address.ward)}
                    onChange={(select) => {
                        setAddress((address) => {
                            return {
                                ...address,
                                ward: select.value,
                            };
                        });
                    }}
                />
            </>
        );
    }
    function PaymentMethodsSelect() {
        const options = [
            {
                value: 1,
                label: 'Thanh toán khi nhận hàng',
            },
            {
                value: 2,
                label: 'Chuyển khoản ngân hàng',
            },
            {
                value: 3,
                label: 'Chuyển khoản momo',
            },
        ];
        return (
            <>
                <Select
                    options={options}
                    value={options.find((op) => op.value === payMethod.value)}
                    onChange={(select) => {
                        setPayMethod({
                            value: select.value,
                            label: select.label,
                        });
                    }}
                />
            </>
        );
    }
    return (
        <>
            <section className="checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>
                                <span className="icon_tag_alt"></span>Bạn có mã
                                giảm giá?{' '}
                                <Link
                                    className="click-here"
                                    to="#"
                                    onClick={handleClickHere}
                                >
                                    Click here
                                </Link>{' '}
                                để nhập mã giảm giá
                            </h6>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <h4>Chi tiết thanh toán</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="checkout__input">
                                                <p>
                                                    Họ & Tên<span>*</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    defaultValue=""
                                                    placeholder="Họ &amp; Tên"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p>Địa chỉ nhận hàng</p>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="checkout__input">
                                                <p>
                                                    Tỉnh/Thành phố<span>*</span>
                                                </p>
                                                <ProvincesSelect />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="checkout__input">
                                                <p>
                                                    Quận/huyện<span>*</span>
                                                </p>
                                                <DistrictsSelect />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="checkout__input">
                                                <p>
                                                    Xã phường<span>*</span>
                                                </p>
                                                <WardsSelect />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <br />
                                        <p>
                                            Địa chỉ chi tiết<span>*</span>
                                        </p>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Số nhà, quận huyện, Tỉnh, Thành Phố"
                                            className="checkout__input__add"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>
                                                    Số điện thoại<span>*</span>
                                                </p>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    defaultValue=""
                                                    placeholder="Số điện thoại"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Email</p>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    defaultValue=""
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__input">
                                        <p>Ghi chú</p>
                                        <input
                                            type="text"
                                            id="note"
                                            placeholder="Thời gian giao hàng ..."
                                        />
                                    </div>
                                    <div className="checkout__input">
                                        <p>Phương thức thanh toán</p>
                                        <PaymentMethodsSelect />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h4>Thông tin hóa đơn</h4>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Sản phẩm
                                                    </th>
                                                    <th
                                                        className="text-center"
                                                        scope="col"
                                                        style={{
                                                            width: '20px',
                                                        }}
                                                    >
                                                        Số lượng
                                                    </th>
                                                    <th scope="col">
                                                        Thành tiền
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {checkout?.products.map(
                                                    (product) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <th scope="row">
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </th>
                                                                    <td
                                                                        className="text-center"
                                                                        style={{
                                                                            width: '20px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {numberToVndString(
                                                                            product.price *
                                                                                product.quantity
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="checkout__order__subtotal">
                                            Tổng tiền hàng{' '}
                                            <span>
                                                {numberToVndString(
                                                    checkout?.products.reduce(
                                                        (sum, prod) => {
                                                            return (
                                                                sum +
                                                                prod.price *
                                                                    prod.quantity
                                                            );
                                                        },
                                                        0
                                                    )
                                                )}
                                            </span>
                                        </div>
                                        <div className="checkout__order__coupons">
                                            Giảm giá
                                            <span>
                                                -
                                                {numberToVndString(
                                                    checkout?.discount.amount
                                                )}
                                            </span>
                                        </div>
                                        <div className="checkout__order__transport-fee">
                                            Phí vận chuyển{' '}
                                            <span className="tien-ship">
                                                30.000&nbsp;₫
                                            </span>
                                        </div>
                                        <div className="checkout__order__total">
                                            Thanh toán{' '}
                                            <span id="tien-thanh-toan">
                                                {numberToVndString(
                                                    checkout?.products.reduce(
                                                        (sum, prod) => {
                                                            return (
                                                                sum +
                                                                prod.price *
                                                                    prod.quantity
                                                            );
                                                        },
                                                        0
                                                    ) -
                                                        checkout?.discount
                                                            .amount
                                                )}
                                            </span>
                                        </div>
                                        <div className="checkout__order__pay-method">
                                            Hình thức thanh toán:{' '}
                                            <span>{payMethod.label}</span>
                                        </div>
                                        <div className="checkout__input__checkbox"></div>
                                        <button
                                            type="button"
                                            className="site-btn"
                                        >
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
export default memo(CheckOut);
