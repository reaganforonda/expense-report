import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

export class CompanyForm extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            companyID: '',
            name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            displayForm: false,
            editMode: false,
            newCompanyBtn: 'Create Compoany',
            btnText: 'Edit'
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewCompanyClick = this.handleNewCompanyClick.bind(this);
    
    }

    static getDerivedStateFromProps(props, state){
        if(props.company){
            if(props.company.company_id !== state.companyID){
                return {
                    companyID: props.company.company_id,
                    name: props.company.name,
                    address: props.company.address,
                    city: props.company.city,
                    state: props.company.state,
                    zipcode: props.company.zipcode,
                    phone: props.company.phone
                }
            }
        } else {
            return{
                newCompany: true
            }
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    handleNewCompanyClick(e) {
        this.setState({displayForm: true, btnText:'Save'});
    }

    render(){
        
        return (
            <div className='company-form'>
                {
                    !this.state.displayForm ? <div className='new-company-btn-container'>
                        <button onClick={(e)=>this.handleNewCompanyClick(e)} >{this.state.newCompanyBtn}</button>
                    </div> : (
                        <div className='company-form-container'>
                            <form className='form'>
                                <div className='form-row'>
                                    <input name='name' value={this.state.name} placeholder='Company Name' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input name='address' value={this.state.address} placeholder='Company Address' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input name='city' value={this.state.city} placeholder='Company City' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input name='state' value={this.state.state} placeholder='Company State' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input name='zipcode' value={this.state.zipcode} placeholder='Company Zip' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input name='phone' value={this.state.phone} placeholder='Phone' onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <button>{this.state.btnText}</button>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer.user
    }
}

export default connect(mapStateToProps, {})(withRouter(CompanyForm))