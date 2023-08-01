import {Link} from "react-router-dom";
import {memo} from "react";
function ContentHeader({ title = '', breadcrumb = [] }) {
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{ title }</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {
                                    breadcrumb.map(
                                        (item, index, breadcrumb) => {
                                            if (index + 1 === breadcrumb.length) {
                                                return (
                                                    <li className="breadcrumb-item" key={ index }>{ item.title }</li>
                                                )
                                            } else {
                                                return (
                                                    <li className="breadcrumb-item" key={ index }><Link to={ item.link }>{ item.title }</Link></li>
                                                )
                                            }
                                        }
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(ContentHeader);