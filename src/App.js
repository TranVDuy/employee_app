import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from './components/employeelist/Table';
import React from 'react'
import ModalAdd from './components/employeelist/Modals/ModalAdd';
import EmployeePaginate from './components/employeelist/EmployeePaginate';


function App() {
  return (
    <div className="container">
      <div className='Row'>
        <ModalAdd />
        <div className="row justify-content-center">
          <Table />
          {/* <EmployeePaginate/> */}
        </div>

      </div>
    </div>
  );
}

export default App;
