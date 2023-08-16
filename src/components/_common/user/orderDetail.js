import { memo, useEffect } from 'react';
import { setPageTitle } from '../../../helpers/setPageTitle';

const OrderDetail = () => {
    useEffect(() => {
        setPageTitle('Chi tiết đơn hàng');
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-sm-12"></div>
            </div>
        </>
    );
};
export default memo(OrderDetail);
