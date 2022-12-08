import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { apis } from '../../../API/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Valid from "../../MessageValid/Valid";

function ModalAdd() {
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({
        employee_name: '',
        salary: ''
    });
    const [valid, setValid] = useState({
        validName: null,
        validSalary: null,
    });

    const [checkValidationForm, setCheckValidationForm] = useState(false);

    const handleClose = () => {
        setInputs({
            employee_name: '',
            salary: 0
        })
        setValid({
            validName: '',
            validSalary: '',
        })
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleChangeInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        CheckValidationForm(name, value)

        setInputs(values => ({ ...values, [name]: value }))

    }

    const handleAddEmployee = async () => {
        await apis.createEmployee(inputs).then((res) => {
            toast.success(res.data.message)
            handleClose()
        })
            .catch((res) => {
                console.log(res);
            })

        setValid(values => ({
            ...values,
            validName: '',
            validSalary: ''
        }))
    }

    const CheckValidationForm = (name, value) => {
        // Check tên nhân viên là chuối trống
        if (name === 'employee_name' && typeof (value) === 'string' && (value === '' || value === null)) {
            setValid(values => ({
                ...values,
                validName: 'Tên nhân viên không được trống',
            }))
            setCheckValidationForm(false)
        }
        else{
            if(name === 'employee_name' && value !== ''){
                setValid(values => ({
                    ...values,
                    validName: '',
                }))
            }
        }
       
        // Check lương nhân viên
        if (name === 'salary' && (value < 0 || value > 50000000 || value === '' || value === null) && typeof(value) === 'string') {
            setValid(values => ({
                ...values,
                validSalary: 'Mức lương phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 50000000',
            }))
            setCheckValidationForm(false)
        }
        else{
            if(name === 'salary' &&  value !== ''){
                setValid(values => ({
                    ...values,
                    validSalary: '',
                }))
            }
        }

        // console.log(`${name}:${value}, ${typeof(value)}`);
        // console.log(valid);
        
        if(valid.validName === '' && valid.validSalary === ''){
            setCheckValidationForm(true)
        }
        else{
            setCheckValidationForm(false)
        }
        
    }
   

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                + Add Employee
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Thêm mới Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name"><span style={{ color: "red" }}>*</span>Name</label>
                            <input
                                id="employee_name"
                                type="text"
                                name="employee_name"
                                className="form-control"
                                value={inputs.employee_name || ''}
                                onChange={handleChangeInputs}
                                autoFocus
                            />
                            {valid.validName ? <Valid message={valid.validName} /> : ''}
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary"><span style={{ color: "red" }}>*</span>Salary</label>
                            <input
                                name="salary"
                                id="salary"
                                type="number"
                                min={0}
                                max={50000000}
                                className="form-control"
                                value={inputs.salary || ''}
                                onChange={handleChangeInputs}
                            />
                            {valid.validSalary ? <Valid message={valid.validSalary} /> : ''}
                        </div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {checkValidationForm ? 
                        <Button onClick={handleAddEmployee} className="btn btn-success">Acept add</Button>
                        :
                        <Button className="btn btn-success disabled">Acept add</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAdd;