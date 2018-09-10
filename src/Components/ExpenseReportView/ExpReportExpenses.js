import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ExpenseList from './ExpenseList';
import ExpenseFormModal from './ExpenseFormModal';
import {loadExpenses} from '../../ducks/expenseReducer';
import Loading from '../Loading/Loading';
import ReportsDropdown from '../DropdownMenus/ReportsDropdown';

export class ExpReportExpenses extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            displayExpenseForm: false,
            selectedExpenses: [],
            report: ''

        }

        this.handlDisplayExpenseForm = this.handlDisplayExpenseForm.bind(this);
        this.handleCheckBox  = this.handleCheckBox.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        
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
        } else if (found) {
            let filtered = this.state.selectedExpenses.filter((value) => {
                return value !== expense_id;
            })
            this.setState({selectedExpenses: filtered})
        }
    }

    handleAddToReport(){
        console.log(this.state.selectedExpenses);
        console.log(this.state.report);
    }

    handleSelect(e){
        this.setState({[e.target.name] : e.target.value})
    }

    render(){
        return (
            <div className='exp-main'>
                <header className='exp-report-header'>
                <div>
                    {
                        this.state.displayExpenseForm ? null : (<button type='button' onClick={()=>this.handlDisplayExpenseForm()}>Create New Expense</button>)
                    }{
                        this.state.selectedExpenses.length > 0 ? <div><div>
                            <button type='button' onClick={()=>this.handleAddToReport()}>Add to Report</button>
                            <ReportsDropdown reports={this.props.expenseReports} select={this.handleSelect}/>
                         </div> <div><button type='button'>Delete Expenses</button></div></div>: null
                    }
                </div>
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
        expenses : state.expenseReducer.expenses,
        expenseReports: state.expenseReducer.expenseReports
    }
}

export default connect(mapStateToProps, {loadExpenses})(withRouter(ExpReportExpenses));