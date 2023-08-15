import { useState } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import { FaStar } from 'react-icons/fa';
import pageApis from '../../../../api/shop/page';
const Comment = ({
    userId,
    comment = {
        star: 4,
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        time: '12/08/2023',
    },
    isUpdate = false,
}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
            const res = await pageApis.getUserById(userId);
            setUser(res.data);
        })();
    }, [userId]);
    function GetStar({ star }) {
        let arr = [];
        for (let i = 0; i < star; i++) {
            arr.push(<FaStar key={i} style={{ color: 'yellow' }} />);
        }
        for (let i = 5; i > star; i--) {
            arr.push(<FaStar key={i} style={{ color: 'rgb(222,222,222)' }} />);
        }
        return <>{arr}</>;
    }
    return (
        <>
            <div className=" comment">
                <div className="user">
                    <div className="avatar">
                        <img src={user?.image} alt={user?.image} width="50" />
                    </div>
                    <div className="username">
                        <div>{user?.firstName + ' ' + user?.lastName}</div>
                        <div className="username__star">
                            <GetStar star={comment?.star} />
                            <div className="username__time ">
                                {comment?.time}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row ml-3">
                    <div
                        className="time col-md-12"
                        style={{
                            position: 'absolute',
                            top: '50px',
                            width: '100px',
                        }}
                    ></div>
                    <div className="col-md-12 mt-3">
                        <span
                            style={{
                                fontSize: '20px',
                            }}
                        >
                            {comment?.content}
                        </span>
                    </div>
                    {isUpdate && (
                        <>
                            <div className="comment__button">
                                <input
                                    className="me-2"
                                    type="button"
                                    value="Sửa"
                                    style={{
                                        backgroundColor: 'white',
                                        outline: 'none',
                                        border: '1px solid rgb(184, 184, 184)',
                                    }}
                                    onclick="DanhGiaSanPham()"
                                />
                                <input
                                    type="button"
                                    value="xóa"
                                    style={{
                                        backgroundColor: 'white',
                                        outline: 'none',
                                        border: '1px solid rgb(184, 184, 184)',
                                    }}
                                    onclick="XoaBinhLuan()"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Comment);
