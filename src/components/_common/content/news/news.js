import { Link, useSearchParams } from 'react-router-dom';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { getStyleImage } from '../../../../helpers/backgroundImage';
import { sizeOfImage } from '../../../../helpers/checkImages';

//
function News() {
    return (
        <>
            <section class="blog">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="blog__item">
                                        <div class="blog__item__pic">
                                            <img
                                                src="/images/news/a_20230725_8bQtU69v6ZGO.jpeg"
                                                alt="a_20230725_8bQtU69v6ZGO.jpeg"
                                            />
                                        </div>
                                        <div class="blog__item__text">
                                            <ul>
                                                <li>
                                                    <i class="fa fa-calendar-o"></i> 25/07/2023
                                                </li>
                                            </ul>
                                            <h5>
                                                <a href="/bai-viet/a">a</a>
                                            </h5>
                                            <a href="/bai-viet/a" class="blog__btn">
                                                Đọc bài viết<span class="arrow_right"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <div class="blog__pagination">
                                <Link class="active" to="#">
                                    1
                                </Link>
                                <Link to="#">2</Link>
                                <Link to="#">3</Link>
                                <Link to="#">
                                    <i class="fa fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(News);
