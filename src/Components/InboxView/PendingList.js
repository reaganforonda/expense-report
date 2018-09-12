import React from 'react';

export default function PendingList (props) {
    console.log(props);
    let reports = props.pendingReports.map((report) => {
        return (
            <div className='pending-report-item' key={report.report_id}>
                {report.report_number}
                
            </div>
        )
    })
    return (
        <div className='pending-list'>
            {reports}
        </div>
    )
}