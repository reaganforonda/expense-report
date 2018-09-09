import React from 'react';


export default function ReportList (props) {
    let reportList = props.reports.map((report) => {
        
        return (
            <div className='report-item' key={report.report_id}>
                {report.description}
                {report.date}
                {report.description}
                {report.approved}
            </div>
        )
    })
    return (
        <div className='report-list'>
            <div>
                <h2>Report Number</h2>
                <h2>Report Date</h2>
                <h2>Report Description</h2>
                <h2>Approve</h2>
            </div>
            {reportList}
        </div>
    )
}