import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from './Messages';
import {apis} from '../../../API/apis'

function ModalInfo({ Employee }) {
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState(
        {
            employee_name: Employee.employee_name,
            salary: Employee.salary
        }
    );
    const [messName, setMessName] = useState('');
    const [messSala, setMessSala] = useState('');
    const [checkValid, setCheckValid] = useState(true);


    const handleClose = () => {
        setInputs(
            {
                employee_name: Employee.employee_name,
                salary: Employee.salary
            }
        )
        setShow(false)
    };
    const handleShow = () => setShow(true);

    // Handle Inputs
    const handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values => ({ ...values, [name]: value }))

        handleCheckVali()
    }
    // End handle inputs

    const handleCheckVali = () => {

        // Check name is null
        if (inputs.employee_name === '') {
            setMessName('Tên không được để trống')
            setCheckValid(false)
        }
        else {
            // Check salary is null
            if (inputs.salary === '') {
                setMessSala('Mức lương không được để trống')
                setCheckValid(false)
            }
            else {
                // Check 500000< salary < 50000000
                if (500000 <= inputs.salary <= 50000000) {
                    setMessSala('Mức lương phải từ 500000 đến 50000000')
                    setCheckValid(false)
                }
                else {
                    setCheckValid(true)
                }
            }
        }
    }

    // Handle Submit
    const handleUpdateEmployee = async () => {
        await apis.editEmployee(Employee.id, inputs).then((res) => {
            toast.success(res.data.message)
            handleClose()
        })
    }

    return (
        <>
            <>
                <Button variant="primary" onClick={handleShow}>
                    View detail
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Information employee by id {Employee.id}</Modal.Title>
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
                                    value={inputs.employee_name || ''}
                                    onChange={handleChangeInput}
                                />
                                {(messName && checkValid) ? <Message mess={messName} /> : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    name="salary"
                                    id="salary"
                                    min="500000"
                                    max="500000000"
                                    type="number"
                                    className="form-control"
                                    value={inputs.salary || ''}
                                    onChange={handleChangeInput}
                                />
                                {(messSala && checkValid) ? <Message mess={messSala} /> : ''}
                            </div>

                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={handleUpdateEmployee} className="btn btn-success">Update</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
}

export default ModalInfo;