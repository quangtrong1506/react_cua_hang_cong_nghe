import { Tabs, Tab, Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import { useState, memo, useEffect, useRef } from 'react';
import userApis from '../../../../api/baseAdmin/user';
import { toast } from 'react-toastify';
import { USER_IMPORT } from '../../../../helpers/constants';
import UserImportHistory from './userImportHistory';
import { useForm } from 'react-hook-form';

function UserImport({ getUsers }) {
    return (
        <>
            <Button variant="success" className={'me-2'}>
                Import
            </Button>
        </>
    );
    const [showImportModal, setShowImportModal] = useState(false);
    const [userImportHistory, setUserImportHistory] = useState([]);
    const [userImportNewest, setUserImportNewest] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            file: null,
        },
    });
    const intervalId = useRef();

    useEffect(() => {
        getUserImportHistory();
        showUserImportNewest();

        return () => {
            clearInterval(intervalId.current);
        };
    }, []);

    useEffect(() => {
        if (userImportNewest) {
            if (
                !intervalId.current &&
                userImportNewest?.status === USER_IMPORT.status.processing.value
            ) {
                intervalId.current = setInterval(() => {
                    showUserImportNewest();
                }, 1000);
            }

            if (intervalId.current && userImportNewest?.status === USER_IMPORT.status.done.value) {
                clearInterval(intervalId.current);
                getUsers();
            }
        }
    }, [userImportNewest]);

    const getUserImportHistory = () => {
        userApis.getUserImportHistory().then((res) => {
            if (res.success) {
                setUserImportHistory(res.data);

                return;
            }
            toast.error(() => <p>Lỗi lịch sử upload</p>);
        });
    };

    const showUserImportNewest = () => {
        userApis.showUserImportNewest().then((res) => {
            if (res.success) {
                if (res.data?.log) {
                    res.data.log = JSON.parse(res.data.log);
                }
                setUserImportNewest(res.data);

                return;
            }
            toast.error(() => <p>Lỗi hiển thị thông tin upload mới nhất.</p>);
        });
    };
    const handleCloseImportModal = () => setShowImportModal(false);
    const handleShowImportModal = () => setShowImportModal(true);

    const handleUpload = async (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);

        const userImportResponse = await userApis.import(formData);

        if (userImportResponse.success) {
            toast.success(() => <p>Upload file thành công.</p>);
            showUserImportNewest();

            return;
        }
        toast.error(() => <p>Upload file thất bại.</p>);
    };

    return (
        <>
            <Button variant="success" onClick={handleShowImportModal} className={'me-2'}>
                Import
            </Button>
            <Modal size={'lg'} show={showImportModal} onHide={handleCloseImportModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập liệu danh sách users</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'px-0'}>
                    <Tabs defaultActiveKey="uploadFile" className="mb-3" fill>
                        <Tab eventKey="uploadFile" title="Upload file" className={'p-3'}>
                            {(() => {
                                if (userImportNewest?.status !== USER_IMPORT.status.done.value) {
                                    return (
                                        <Alert variant={'warning'}>
                                            <b>Có 1 tiến trình đang diễn ra</b>. Không thể upload
                                            file mới!
                                        </Alert>
                                    );
                                }
                            })()}
                            <Form className={'mb-3'} onSubmit={handleSubmit(handleUpload)}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>File import</Form.Label>
                                    <Form.Control
                                        type="file"
                                        disabled={
                                            userImportNewest?.status !==
                                            USER_IMPORT.status.done.value
                                        }
                                        {...register('file', {
                                            required: 'File upload không được để trống',
                                        })}
                                    />
                                    <Form.Text className="text-muted">
                                        *Chỉ có thể import file excel file excel
                                    </Form.Text>
                                    {errors.file && (
                                        <p className={'text-danger fw-bold'}>
                                            {errors.file.message}
                                        </p>
                                    )}
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="button"
                                    disabled={
                                        userImportNewest?.status !== USER_IMPORT.status.done.value
                                    }
                                    onClick={handleSubmit(handleUpload)}
                                >
                                    Upload
                                </Button>
                            </Form>
                            {(() => {
                                if (userImportNewest?.has_errors === USER_IMPORT.has_errors.true) {
                                    return (
                                        <div>
                                            <h5>Danh sách user lỗi</h5>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Họ tên</th>
                                                        <th>Số điện thoại</th>
                                                        <th>Email</th>
                                                        <th>Lỗi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userImportNewest?.log?.errors.map(
                                                        (item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.user.name}</td>
                                                                <td>{item.user.phone}</td>
                                                                <td>{item.user.email}</td>
                                                                <td>
                                                                    <span className={'text-danger'}>
                                                                        {item.error}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>
                                    );
                                }
                            })()}
                        </Tab>
                        <Tab eventKey="history" title="Lịch sử upload" className={'p-3'}>
                            <UserImportHistory history={userImportHistory}></UserImportHistory>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default memo(UserImport);
