import moment from 'moment';
import { generateFileToUrl } from '../../../../helpers/common';
import { USER_IMPORT } from '../../../../helpers/constants';
import { Table } from 'react-bootstrap';
import { memo } from 'react';
function UserImportHistory({ history }) {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {(() => {
                                    if (item.file?.data) {
                                        return (
                                            <a
                                                download={
                                                    moment().format('YYYYMMDD_HHmmss_') +
                                                    'users.xlsx'
                                                }
                                                href={generateFileToUrl(item.file.data)}
                                            >
                                                Download
                                            </a>
                                        );
                                    }
                                })()}
                            </td>
                            <td>{item.created_at}</td>
                            <td>
                                {
                                    Object.values(USER_IMPORT.status).find(
                                        (status) => status.value === item.status
                                    ).label
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default memo(UserImportHistory);
