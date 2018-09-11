import React from 'react';
import * as util from '../../utilities/generalUtilities'

export default function ReportList (props) {
    let reportList = props.reports.map((report) => {
        return (
            <div className='report-item' key={report.report_id}>
                <div>{report.report_number}</div>
                <div>{util.formatDate(report.report_date)}</div>
                <div>{report.description}</div>
                <div>{util.formatCurrency(parseFloat(report.amount))}</div>
                <div>
                {
                    report.status.Approve ? "Approved" : report.status.Rejected ? "Rejected" : report.status.Submitted  ? "Submitted" : "Open"
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