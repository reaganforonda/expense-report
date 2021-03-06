import React from 'react';

export default function DepartmentDropdown(props) {

    let depts = []
    if(props.departments) {
        depts = props.departments.map((department, index) => {
            return (
                <option value={department.dept_id} key={~~department.dept_id + index}>{department.name}</option>
            )
        })
    }

    return (
        <select disabled={props.disabled} onChange={(e)=>props.handleSelect(e)} name='department' className='dept-dropdown'>
            <option value='' disabled selected>Department</option>
            {depts}
        </select>
    )
}