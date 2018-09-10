import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadExpenseReports} from '../../ducks/expenseReducer';

export class ReportFormModal extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            date: '',
            description: '',
            reportNumber: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmitForm(e) {
        e.preventDefault();

        let report = {
            user: this.props.user,
            date: this.state.date,
            description: this.state.description,
            reportNumber: this.state.reportNumber
        }

        axios.post('/api/expense/report', report).then((result) => {
            this.props.loadExpenseReports(this.props.user.employee_id);
            this.resetForm();
        }).catch(err=> {
            console.log(err.response);
        })
    }

    resetForm(){
        this.setState({
            date: '',
            description: '',
            reportNumber: ''
        })
    }

    render(){
        const disabled = (this.state.date === '') && (this.state.description.length < 1) && (this.state.reportNumber.length < 1);
        return (
            <main className='report-form-modal'>
                <form className='report-form'>
                    <div className='form-row'>
                        <h2>{this.props.user.first_name} {this.props.user.last_name}</h2>
                    </div>
                    <div className='form-row'>
                        <h2>{this.props.user.name}</h2>
                    </div>
                    <div className='form-row'>
                        <div>Reference Number:</div><input type='text' name='reportNumber' maxLength={10} placeholder='Reference Number' value={this.state.reportNumber} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='form-row'>
                        <div>Report Date</div> <input type='date' name='date' value={this.state.date} placeholder='Report Date' onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='form-row'>
                        <div>Description</div> <input type='text' name='description' value={this.state.description} maxLength={50} placeholder='Report Description' onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='form-row'>
                        <button onClick={()=>this.props.closeForm()}type='button'>Cancel</button>
                        <button disabled={disabled} onClick={(e)=>this.handleSubmitForm(e)}>Submit</button>
                    </div>
                </form>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        expenseReports: state.expenseReducer.expenseReports
    }
}

export default connect(mapStateToProps, {loadExpenseReports})(ReportFormModal);