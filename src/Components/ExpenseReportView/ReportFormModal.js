import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

export default class ReportFormModal extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            date: '',
            description: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleSubmitForm(e) {
        e.preventDefault();

        let report = {
            user: this.props.user,
            date: this.state.date,
            description: this.state.description
        }

        axios.post('/api/expense/report', report).then((result) => {
            console.log(result);
        }).catch(err=> {
            console.log(err.response);
        })
    }

    render(){
        const disabled = (this.state.date === '') && (this.state.description.length < 1);
        return (
            <main className='report-form-modal'>
                <form className='report-form'>
                    <div className='form-row'>
                        <p>Employee Name</p>
                    </div>
                    <div className='form-row'>
                        <p>Employee Department</p>
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