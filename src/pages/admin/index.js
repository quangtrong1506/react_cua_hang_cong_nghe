import ContentHeader from '../../components/admin/content/contentHeader';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faArrowAltCircleRight, faUsers, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faComments, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);
const data = [
    {
        year: 2019,
        users: 80000,
        articles: 8230,
        comments: 10000,
        reactions: 20000,
    },
    {
        year: 2020,
        users: 100000,
        articles: 9230,
        comments: 20000,
        reactions: 25000,
    },
    {
        year: 2021,
        users: 102000,
        articles: 9230,
        comments: 25000,
        reactions: 26000,
    },
    {
        year: 2022,
        users: 120000,
        articles: 10230,
        comments: 30000,
        reactions: 45000,
    },
    {
        year: 2023,
        users: 150000,
        articles: 12230,
        comments: 45000,
        reactions: 55000,
    },
];
export default function Index() {
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/',
        },
        {
            title: 'Dashboard',
            link: '/',
        },
    ]);
    const [parentTitle] = useState('DashBoard');
    const [chartData, setChartData] = useState({
        labels: data.map((item) => item.year),
        datasets: [
            {
                label: 'Users',
                data: data.map((item) => item.users),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
            {
                label: 'Bài viết',
                data: data.map((item) => item.articles),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
            {
                label: 'Bình luận',
                data: data.map((item) => item.comments),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
            {
                label: 'Tương tác',
                data: data.map((item) => item.reactions),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });
    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle} />
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-lg-3 col-6'}>
                            <div className="small-box bg-info text-white">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Users</p>
                                </div>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <Link to={'/'} className={'small-box-footer'}>
                                    More info
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleRight}
                                        className={'ms-1'}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={'col-lg-3 col-6'}>
                            <div className="small-box bg-success text-white">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Bài viết</p>
                                </div>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faNewspaper} />
                                </div>
                                <Link to={'/'} className={'small-box-footer'}>
                                    More info
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleRight}
                                        className={'ms-1'}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={'col-lg-3 col-6'}>
                            <div className="small-box bg-warning text-white">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Bình luận</p>
                                </div>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                                <Link to={'/'} className={'small-box-footer'}>
                                    More info
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleRight}
                                        className={'ms-1'}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className={'col-lg-3 col-6'}>
                            <div className="small-box bg-danger text-white">
                                <div className="inner">
                                    <h3>150</h3>
                                    <p>Tương tác</p>
                                </div>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </div>
                                <Link to={'/'} className={'small-box-footer'}>
                                    More info
                                    <FontAwesomeIcon
                                        icon={faArrowAltCircleRight}
                                        className={'ms-1'}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-12 mb-3'}>
                            <h3>Biểu đồ tổng quát</h3>
                            <form className={'row'}>
                                <div className={'col-4'}>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option value="1">Theo năm</option>
                                        <option value="2">Theo tháng</option>
                                    </select>
                                </div>
                                <div className={'col-2'}>
                                    <input type="text" className="form-control" placeholder="từ" />
                                </div>
                                <div className={'col-2'}>
                                    <input type="text" className="form-control" placeholder="đến" />
                                </div>
                            </form>
                        </div>
                        <Line data={chartData} className={'col-12'} />
                    </div>
                </div>
            </section>
        </>
    );
}
