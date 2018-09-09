import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ExpenseList from './ExpenseList';
import ExpenseFormModal from './ExpenseFormModal';
import {loadExpenses} from '../../ducks/expenseReducer';
import Loading from '../Loading/Loading';

export class ExpReportExpenses extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayExpenseForm: false
        }

        this.handlDisplayExpenseForm = this.handlDisplayExpenseForm.bind(this);
    }

    handlDisplayExpenseForm (){
        if(this.state.displayExpenseForm === false ) {
            this.setState({displayExpenseForm : true});
        } else {
            this.setState({displayExpenseForm : false});
        }
    }

    render(){
        return (
            <div className='exp-main'>
                <header className='exp-report-header'>
                {
                    this.state.displayExpenseForm ? null : (<button type='button' onClick={()=>this.handlDisplayExpenseForm()}>Create New Expense</button>)
                }
                {
                    this.state.displayExpenseForm ? <ExpenseFormModal user={this.props.user} closeForm={this.handlDisplayExpenseForm}/> : null
                }
                </header>
                <main >
                    <ExpenseList expenses = {this.props.expenses}/>
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        expensesLoading: state.expenseReducer.expensesLoading,
        expenses : state.expenseReducer.expenses
    }
}

export default connect(mapStateToProps, {loadExpenses})(withRouter(ExpReportExpenses));