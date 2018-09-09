import React from 'react';
import {connect} from 'react-redux';
import {loadExpenses} from '../../ducks/expenseReducer'

export class ExpenseFormModal extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            date: '',
            merchant : '',
            amount : '',
            category: '',
            comment: '',
            tags: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleInputChange(e) {
        this.setsState({[e.target.name]: e.target.value})
    }

    handleSubmitForm (e) {
        e.preventDefault();

        let expense = {
            employee : this.props.user,
            date: this.state.date,
            merchant: this.state.merchant,
            amount: this.state.amount,
            category: this.state.category,
            comment: this.state.comment,
            tage: this.state.tags
        }

        console.log(expense)
    }

    resetForm(){
        this.setState({
            date: '',
            merchant : '',
            amount : '',
            category: '',
            comment: '',
            tags: ''
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