import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//element
function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/post?limit=3')
            .then((res) => res.json())
            .then((json) => setNews(json.posts));
    }, []);
    return (
        <>
            <section className="from-blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title from-blog__title">
                                <h2>Bài viết mới</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {news.map((post, index) => {
                            return (
                                <div
                                    className="col-lg-4 col-md-4 col-sm-6"
                                    key={index}
                                >
                                    <div className="blog__item">
                                        <div className="blog__item__pic">
                                            <img
                                                src="/images/demo-1.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="blog__item__text">
                                            <h4 className="title">
                                                <Link to="#">{post.title}</Link>
                                            </h4>
                                            {/* <ul>
                                                <li>
                                                    <i className="fa fa-calendar-o"></i> 20/04/2022
                                                </li>
                                                <li>
                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                    {post.reactions}
                                                </li>
                                            </ul> */}
                                            <p>{post.body}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(News);
