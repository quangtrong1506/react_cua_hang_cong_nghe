import { useState } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import pageApis from '../../../../api/shop/page';
import Comment from '../comment/comment';
import SweetAlert2 from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(SweetAlert2);
const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        (async () => {
            if (id) {
                const cmt = await pageApis.getCommentById(id);
                if (cmt.success) setComments(cmt.data.comments);
                else setComments([]);
            } else setComments([]);
        })();
    }, [id]);
    function handleAddCommentBtn({
        star = -1,
        comment = '',
        isUpdate = false,
    }) {
        if (!isUpdate) {
            star = -1;
            comment = '';
        }
        if (star === 1) var checked1 = 'checked';
        if (star === 2) var checked2 = 'checked';
        if (star === 3) var checked3 = 'checked';
        if (star === 4) var checked4 = 'checked';
        if (star === 5) var checked5 = 'checked';
        MySwal.fire({
            title: isUpdate ? 'Chỉnh sửa đánh giá' : 'Thêm đánh giá mới',
            html: `
            <h5>Đánh giá của bạn</h5>
            <br>
            <textarea name="" id="report-text" style="width: 80%; height: 100px;" >${comment}</textarea>
            <section id="rate" class="rating">
                <input type="radio" id="star_5" name="rate" value="5" ${checked5} />
                <label for="star_5" title="Five">&#9733;</label>
                <input type="radio" id="star_4" name="rate" value="4" ${checked4} />
                <label for="star_4" title="Four">&#9733;</label>
                <input type="radio" id="star_3" name="rate" value="3" ${checked3} />
                <label for="star_3" title="Three">&#9733;</label>
                <input type="radio" id="star_2" name="rate" value="2" ${checked2} />
                <label for="star_2" title="Two">&#9733;</label>
                <input type="radio" id="star_1" name="rate" value="1" ${checked1}/>
                <label for="star_1" title="One">&#9733;</label>
            </section>
        `,
            focusConfirm: true,
            showCancelButton: true,
            confirmButtonText: 'Đánh giá',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                let text = document.getElementById('report-text').value;
                star = document.getElementById('star_5').checked
                    ? 5
                    : document.getElementById('star_4').checked
                    ? 4
                    : document.getElementById('star_3').checked
                    ? 3
                    : document.getElementById('star_2').checked
                    ? 2
                    : document.getElementById('star_1').checked
                    ? 1
                    : -1;
                if (!text) {
                    MySwal.fire(
                        'Vui lòng nhập bình luận',
                        '',
                        'info',
                        handleAddCommentBtn
                    );
                } else if (star === -1) {
                    MySwal.fire(
                        'Lựa chọn số sao đánh giá của bạn',
                        '',
                        'info',
                        handleAddCommentBtn
                    );
                } else {
                    MySwal.fire('Thêm bình luận thành công');
                }
            }
        });
    }
    return (
        <>
            <div className="row">
                <div className="col">
                    <h4>Đánh giá của khách hàng</h4>
                </div>
                <div
                    className="col"
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <input
                        type="button"
                        value="Bình luận sản phẩm"
                        onClick={handleAddCommentBtn}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col col-md-12 mt-5">
                    {comments.map((value, key) => {
                        return (
                            <Comment
                                key={key}
                                comment={{
                                    content: value.body,
                                    star: Math.floor(Math.random() * 4 + 1),
                                }}
                                userId={value.user.id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default memo(Comments);
