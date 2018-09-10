import React from 'react';
import {connect} from 'react-redux';
import {loadExpenses} from '../../ducks/expenseReducer'
import axios from 'axios';

export class ExpenseFormModal extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            date: '',
            merchant : '',
            amount : '',
            category: '',
            comment: '',
            reportID: '',
            tags: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.resetForm = this.resetForm;
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmitForm (e) {
        e.preventDefault();

        let expense = {
            reportID : this.state.reportID,
            user : this.props.user,
            date: this.state.date,
            merchant: this.state.merchant,
            amount: this.state.amount,
            category: this.state.category,
            comment: this.state.comment,
            tags: this.state.tags
        }

        axios.post('/api/expense', expense).then((result) => {
            this.loadExpenses(this.props.user.employee_id);
            this.resetForm();
        }).catch((err) => {
            console.log(err.response)
        })
    }

    resetForm(){
        this.setState({
            date: '',
            merchant : '',
            amount : '',
            category: '',
            comment: '',
            tags: '',
            reportID: ''
        })
    }

    render(){
        return (
            <div className='expense-form-modal'>
                <form className='expense-form'>
                    <div className='expense-form-row'>
                        Add new Expense
                    </div>
                    <div className='expense-form-row'>
                        <input type='date' placeholder='Expense Date' name='date' value={this.state.date} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='expense-form-row'>
                        <input type='text' placeholder='Merchant' name='merchant' value={this.state.merchant} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='expense-form-row'>
                        <input type='number' placeholder='Amount' name='amount' value={this.state.amount} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='expense-form-row'>
                        <input type='text' placeholder='Comment' name='comment' value={this.state.comment} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='expense-form-row'>
                        <input type='text' placeholder='Category' name='category' value={this.state.category} onChange={(e)=>this.handleInputChange(e)}/>
                    </div>
                    <div className='expense-form-row'>
                        <div className='expen-form-btns'>
                            <button type='button' onClick={()=>this.props.closeForm()}>Cancel</button>
                            <button onClick={(e)=>this.handleSubmitForm(e)}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, {loadExpenses})(ExpenseFormModal);