import React from 'react';
import * as util from '../../utilities/generalUtilities';
import axios form 'axios';

export default class PendingList extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayDetails: false,
            expenses: []
        }
    }

    getExpenses(reportID) {
        
    }

    render(){
        let reports = this.props.pendingReports.map((report) => {
            return (
                <div className='pending-report-item' key={report.report_id}>
                    <div>{report.report_number}</div>
                    <div>{report.first_name} {report.last_name}</div>
                    <div>{util.formatDate(report.report_date)}</div>
                    <div>{report.description}</div>
                    <div>{util.formatCurrency(parseFloat(report.total))}</div>
                </div>
            )
        })
        return (
            <div className='pending-list'>
            {reports}
        </div>
        )
    }
}