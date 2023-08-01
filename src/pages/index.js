import { useEffect } from 'react';
import Banner from '../components/_common/content/index/Banner';
import Categories from '../components/_common/content/index/Categories';
import News from '../components/_common/content/index/News';
import Products from '../components/_common/content/index/Products';
import RecommendProducts from '../components/_common/content/index/RecommendProducts';

export default function Index() {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);
    return (
        <>
            <Banner
                info={{
                    text: {
                        top: 'sản phẩm vừa ra mắt',
                        main: 'Xiaomi 12T Series<br />Mua ngay với ưu đãi khủng',
                        button: 'Mua ngay',
                    },
                    link: '#',
                    image: '/images/banner.png',
                }}
            />
            <Categories></Categories>
            <Products></Products>
            <RecommendProducts></RecommendProducts>
            <News></News>
        </>
    );
}
