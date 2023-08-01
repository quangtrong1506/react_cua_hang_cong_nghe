import userApis from '../../../../api/baseAdmin/user';
import moment from 'moment';
import { toast } from 'react-toastify';
import { memo } from 'react';
import { generateFileToUrl } from '../../../../helpers/common';

function UserExport({ data = {} }) {
    const handleExport = async () => {
        for (const field in data) {
            if (!data[field]) {
                console.log(111222);
                delete data[field];
            }
        }
        const exportUserResponse = await userApis.export(data);

        if (exportUserResponse.success) {
            const a = document.createElement('a');
            a.download = moment().format('YYYYMMDD_HHmmss_') + 'users.xlsx';
            a.href = generateFileToUrl(exportUserResponse.data.data);
            document.body.appendChild(a);
            a.click();
            return;
        }
        toast.error(() => <p>Export users thất bại</p>);
    };

    return (
        <>
            <button type="button" className="btn btn-info" onClick={handleExport}>
                Export
            </button>
        </>
    );
}

export default memo(UserExport);
