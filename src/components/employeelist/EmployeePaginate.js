import React, { useEffect, useState } from "react";
import TableRow from './TableRow.js'
import { apis } from '../../API/apis'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EmployeePaginate() {

    // const [employeePaginate, setEmployeePaginate] = useState([])
    // const [pageNumber, setPageNumber] = useState(1)
    // const [paginate, setPaginate] = useState([])
    // const [total, setTotal] = useState('')
    // const [currentPage, setCurrentPage] = useState(1)


    const [data, setData] = useState({
        listData: [],
        current_page: 1,
        per_page: 5,
        paginate: []
    })


    useEffect(() => {
        getEmployeePaginate()
    }, [data.current_page])


    const getEmployeePaginate = () => {
        apis.getListWithPaginate(data.current_page).then((res) => {
            //    setEmployeePaginate(res.data.data.data)
            setData(values => ({...values, 
                currentPage: res.data.data.current_page,
                listData: res.data.data.data,
                total: res.data.data.total,
                per_page: res.data.data.per_page,
                paginate: res.data.data.links
            }))
        })
    }

    const setPageNumber = (p) => {
        setData(values => ({...values, current_page : p}))
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
                    {data.listData.map((item, index) => (
                        <TableRow item={item} key={index} />
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                        data.paginate.map((item, index) => (
                            item.active ? 
                            <li key={index} className="page-item active"><button onClick={() => setPageNumber(item.label)} className="page-link" >{item.label}</button></li>
                            :
                            <li key={index} className="page-item"><button onClick={() => setPageNumber(item.label)} className="page-link">{item.label}</button></li>
                        ))
                    }
                    
                </ul>
            </nav>

        
        </>
    );
}

export default EmployeePaginate;