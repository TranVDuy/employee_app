import axios from "axios"
import {URL, EMPLOYEES, EMPLOYEE, DESTROY, STORE, LIST} from '../Constans/consts'

export const apis = {
    getListEmployee: () => {
        return axios.get(`${URL}/${EMPLOYEES}`)
    },
    getListWithPaginate: (pageNumber) => {
        return axios.get(`${URL}/${EMPLOYEES}/${LIST}?page=${pageNumber}`)
    },
    viewEmployee: (id) => {
        return axios.get(`${URL}/${EMPLOYEE}/${id}`)
    },
    deleteEmployee: (id) => {
        return axios.delete(`${URL}/${EMPLOYEE}/${DESTROY}/${id}`)
    },
    createEmployee: (values) => {
        return axios.post(`${URL}/${EMPLOYEE}/${STORE}`, values)
    },
    editEmployee: (id, values) => {
        return axios.put(`${URL}/${EMPLOYEE}/${id}`, values)
    }
}