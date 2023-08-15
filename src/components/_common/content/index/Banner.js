import { Link } from 'react-router-dom';
import { memo } from 'react';
import { getStyleBgImage } from '../../../../helpers/image';
function Banner({ info = { text: { top: '', main: '', button: '' }, image: '', link: '#' } }) {
    return (
        <>
            <section>
                <div className="container">
                    <div
                        className="hero__item set-bg"
                        data-setbg={info.image}
                        style={getStyleBgImage(info.image)}
                    >
                        <div className="hero__text">
                            <span className="text">{info.text.top}</span>
                            <h2
                                className="text"
                                dangerouslySetInnerHTML={{ __html: info.text.main }}
                            ></h2>
                            <Link to={info.link} className="primary-btn">
                                {info.text.button}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(Banner);
