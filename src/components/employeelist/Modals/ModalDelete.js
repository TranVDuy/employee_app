import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {apis} from '../../../API/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalDelete({Employee}) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleDeleteEmployee = async () => {
        await apis.deleteEmployee(Employee.id).then((res) => {
            toast.success(res.data.message)
            handleClose()
        })
    }

    return ( 
        <>
                <Button variant="danger" onClick={handleShow}>
                    Delete
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Bạn chắc chắn muốn xóa Employee id {Employee.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="employee_name"
                                    type="text"
                                    name="employee_name"
                                    className="form-control"
                                    value={Employee.employee_name}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    name="salary"
                                    id="salary"
                                    type="number"
                                    className="form-control"
                                    value={Employee.salary}
                                    readOnly
                                />
                            </div>

                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleDeleteEmployee} className="btn btn-danger">Delete this employee</Button>
                    </Modal.Footer>
                </Modal>
            </>
    );
}

export default ModalDelete;