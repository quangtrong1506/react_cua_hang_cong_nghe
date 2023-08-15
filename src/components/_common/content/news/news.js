import { Link } from 'react-router-dom';
import { memo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

//
function NewsComponent({
    thumbnail = '/images/demo-1.jpg',
    url,
    title,
    subtitle,
    updateAt = new Date().toLocaleDateString(),
}) {
    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                    <div className="blog__item__pic">
                        <img src={thumbnail} alt={thumbnail} />
                    </div>
                    <div className="blog__item__text">
                        <ul>
                            <li>
                                <FaCalendarAlt className="svg-fa" /> {updateAt}
                            </li>
                        </ul>
                        <h5>
                            <Link to={url}>{title}</Link>
                        </h5>
                        <p>{subtitle}</p>
                        <Link to={url} className="blog__btn">
                            Đọc bài viết
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(NewsComponent);
