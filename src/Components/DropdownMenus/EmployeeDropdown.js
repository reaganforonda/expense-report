import React from 'react';

export default function EmployeeDropdown (props) {
    console.log(props);
    let employees = []

    if(props.employees) {
        employees = props.employees.map((employee, index) => {
            console.log(employee);
            return (
                <option  value={employee.user_id} key={employee.user_id}>{employee.first_name} {employee.last_name} - {employee.title}</option>
            )
        })
    }

    return (
        <select onChange={(e)=>props.selectApprover(e)} name='approver' className='employeedropdown'>
            <option value='' disabled selected>Select Approver</option>
            {employees}
        </select>
    )
}