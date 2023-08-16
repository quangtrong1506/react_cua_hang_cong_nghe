import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../../../helpers/setPageTitle';

const Profile = () => {
    useEffect(() => {
        setPageTitle('Đơn hàng của bạn');
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <h3 className="mt-2 mb-3">Danh sách đơn hàng của bạn</h3>
                    <table className="table my-orders">
                        <thead>
                            <tr>
                                <th className="index" scope="col">
                                    #
                                </th>
                                <th className="id" scope="col">
                                    ID
                                </th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="index" scope="row">
                                    1
                                </th>
                                <td className="id">#23442</td>
                                <td className="products">
                                    <div>
                                        <span>sản phẩm 1</span>
                                        <span>sản phẩm 2</span>
                                    </div>
                                </td>
                                <td className="total">10.000 đ</td>
                                <td>Đã hoàn thành</td>
                                <td className="link">
                                    <Link to="">Chi tiết</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default memo(Profile);
