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
            displayExpenseForm: false,
            selectedExpenses: []

        }

        this.handlDisplayExpenseForm = this.handlDisplayExpenseForm.bind(this);
        this.handleCheckBox  = this.handleCheckBox.bind(this);
    }

    handlDisplayExpenseForm (){
        if(this.state.displayExpenseForm === false ) {
            this.setState({displayExpenseForm : true});
        } else {
            this.setState({displayExpenseForm : false});
        }
    }

    handleCheckBox(expense_id){
        let found = this.state.selectedExpenses.find((expense)=> {
            return expense === expense_id
        })

        if(!found) {
            this.setState({
                selectedExpenses : [...this.state.selectedExpenses, expense_id]
            });
            console.log(`Add: ${this.state.selectedExpenses}`)
        } else if (found) {
            let filtered = this.state.selectedExpenses.filter((value) => {
                return value !== expense_id;
            })
            this.setState({selectedExpenses: filtered})
            console.log(`Remove: ${this.state.selectedExpenses}`)
        }
    }

    render(){
        console.log(this.state.selectedExpenses);
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
                    <ExpenseList handleCheckbox={this.handleCheckBox} expenses = {this.props.expenses}/>
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