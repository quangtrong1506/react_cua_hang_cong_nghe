import { memo } from 'react';
import NewsComponent from '../../components/_common/content/news/news';
import { Link, useSearchParams } from 'react-router-dom';
import CustomPagination from '../../components/customPagination';
import { useState } from 'react';
import { useEffect } from 'react';
import pageApis from '../../api/shop/page';
import { useRef } from 'react';
import { scrollToTop } from '../../helpers/siteEffect';
import { setPageTitle } from '../../helpers/setPageTitle';
import { useMemo } from 'react';
function News() {
    const [news, setNews] = useState([]);
    const page = useRef({
        current: 1,
        max: 1,
        limit: 9,
    });
    const [searchQuery] = useSearchParams();
    const setTitle = useMemo(() => {
        return () => {
            setPageTitle(
                searchQuery.get('page')
                    ? 'Tin tức - trang ' + searchQuery.get('page')
                    : 'Tin tức'
            );
        };
    }, [searchQuery]);
    useEffect(() => {
        scrollToTop();
        setTitle();
        page.current.current = parseInt(searchQuery.get('page') || 1);
        (async () => {
            const res = await pageApis.getPosts({
                limit: page.current.limit,
                page: page.current.current,
            });
            if (res.success) {
                let data = res.data;
                page.current.max = Math.floor(data.total / data.limit) + 1;
                setNews(data.posts);
            }
        })();
    }, [searchQuery, setTitle]);
    console.log(page);
    return (
        <>
            <section className="blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="row">
                                {news.map((post, index) => (
                                    <NewsComponent
                                        key={index}
                                        thumbnail={post.thumbnail}
                                        title={post.title}
                                        subtitle={post.subtitle}
                                        url={post.url}
                                        updateAt={post.updateAt}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="blog__pagination">
                                <CustomPagination
                                    page={page.current.current}
                                    pages={page.current.max}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default memo(News);
