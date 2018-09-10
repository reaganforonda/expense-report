import React from 'react';


export default function ReportList (props) {
    let reportList = props.reports.map((report) => {
        
        return (
            <div className='report-item' key={report.report_id}>
                <div>{report.report_number}</div>
                <div>{report.date}</div>
                <div>{report.description}</div>
                <div>{report.amount}</div>
                <div>
                {
                    report.approve? "Yes" : "No"
                }
                </div>
            </div>
        )
    })
    return (
        <div className='report-list'>
            <div className='report-list-header'>
                <h2>Report Number</h2>
                <h2>Report Date</h2>
                <h2>Report Description</h2>
                <h2>Amount</h2>
                <h2>Approved</h2>
            </div>
            {reportList}
        </div>
    )
}