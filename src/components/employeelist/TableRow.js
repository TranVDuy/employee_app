import React from "react";
import ModalInfo from "./Modals/ModalCenter";
import ModalDelete from "./Modals/ModalDelete";


function TableRow({ item }) {
    return (

        <tr>
            <th>{item.id}</th>
            <td>{item.employee_name}</td>
            <td>{item.salary}</td>
            <td>
                <div className="btn-group">
                    <ModalInfo Employee={item}/>
                    {/* <button className="btn btn-success">Edit</button> */}
                    <ModalDelete Employee={item}/>
                </div>
            </td>
        </tr>

    );
}

export default TableRow;