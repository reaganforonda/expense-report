import React from 'react';

export default function EmployeeDropdown (props) {
    let employees = []

    if(props.employees) {
        employees = props.employees.map((employee, index) => {  
            return (
                <option  value={employee.user_id} key={employee.user_id}>{employee.first_name} {employee.last_name} - {employee.title}</option>
            )
        })
    }

    return (
        <select disabled={props.disabled}   onChange={(e)=>props.selectApprover(e)} name='approver' className='employeedropdown'>
            <option value='' disabled selected>Select Approver</option>
            {employees}
        </select>
    )
}