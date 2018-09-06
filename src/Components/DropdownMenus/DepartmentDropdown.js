import React from 'react';

export default function DepartmentDropdown(props) {

    let depts = props.departments.map((department, index) => {
        return (
            <option value={department.name} key={~~department.department_id + index}>{department.name}</option>
        )
    })

    return (
        <select onChange={(e)=>props.handleSelect(e)} name='department' className='dept-dropdown'>
            <option value='' disabled selected>Department</option>
            {depts}
        </select>
    )
}