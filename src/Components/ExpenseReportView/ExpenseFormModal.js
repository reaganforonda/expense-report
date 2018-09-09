import React from 'react';
import {connect} from 'react-redux';
import {loadExpenses} from '../../ducks/expenseReducer'

export class ExpenseFormModal extends React.Component{
    constructor(props) {
        super(props);

        this.state={

        }
    }

    render(){
        return (
            <div className='expense-form-modal'>
                <form className='expense-form'>
                    <div className='expense-form-row'>
                    
                    </div>
                    <div className='expense-form-row'>
                        <div className='expen-form-btns'>
                            <button type='button' onClick={()=>this.props.closeForm()}>Cancel</button>
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