import React from 'react';

export default function ReportsDropdown (props) {
    let reports = []

    if(props.reports) {
        reports = props.reports.map((report, index) =>{
            return (
                <option value={report.report_id} key={~~report.report_id}>{report.report_id}-{report.description}</option>
            )
        })
    }

    return (
        <select onChange={(e)=>props.select(e)}name='report' className='report-dropdown'>
            <option value='' disabled selected>Report</option>
            {reports}
        </select>
    )
}