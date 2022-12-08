import React, { useEffect, useState } from 'react'
import TableRow from './TableRow.js'
import {apis} from '../../API/apis'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Table() {

    const [employeeList, setEmployeeList] = useState([])
  
    useEffect(() => {
        getEmployeeList()
    },[])

 
    const getEmployeeList = () => {
        apis.getListEmployee().then((res) => {
            setEmployeeList(res.data.data)
        })
    }


    return (
        <>
            <ToastContainer />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((item, index) => (
                        <TableRow item={item} key={index} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;