import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as util from '../../../utilities/generalUtilities';
import {loadCompany} from '../../../ducks/companyReducer';

export class CompanyForm extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            userID: this.props.user.user_id,
            companyID: '',
            name: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            displayForm: false,
            editMode: '',
            newCompanyBtn: 'Create Compoany',
            btnText: 'Edit'
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewCompanyClick = this.handleNewCompanyClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
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
                    phone: props.company.phone,
                    editMode: 'Edit'
                }
            }
        } else {
            return{
                newCompany: true,
                editMode: 'New'
            }
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    handleNewCompanyClick(e) {
        this.setState({displayForm: true, btnText:'Save'});
    }

    handleBtnClick(e) {
        e.preventDefault();

        let company = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.address,
            state: this.state.state,
            zipcode: this.state.zipcode,
            phone: this.state.phone,
            admin: this.state.userID
        }

        if(this.state.editMode === 'New') {
            console.log(company);
        } else if (this.state.editMode = 'Edit') {
            console.log(`Edit: ${company}`)
        }
    }

    render(){
        let disabledBtn = !(util.validCity(this.state.city) && util.validZipCode(this.state.zipcode) && util.validState(this.state.state) && util.validAddress(this.state.address));
        
        return (
            <div className='company-form'>
                {
                    !this.state.displayForm ? <div className='new-company-btn-container'>
                        <button onClick={(e)=>this.handleNewCompanyClick(e)} >{this.state.newCompanyBtn}</button>
                    </div> : (
                        <div className='company-form-container'>
                            <form className='form'>
                                <div className='form-row'>
                                    <input type='text' name='name' value={this.state.name} placeholder='Company Name' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input type='text' name='address' value={this.state.address} placeholder='Company Address' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input type='text' name='city' value={this.state.city} placeholder='Company City' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input type='text' name='state' value={this.state.state} placeholder='Company State' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input type='number' name='zipcode' value={this.state.zipcode} placeholder='Company Zip' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <input type='text' name='phone' value={this.state.phone} placeholder='Phone' 
                                        onChange={(e)=>this.handleInputChange(e)}/>
                                </div>
                                <div className='form-row'>
                                    <button disabled={disabledBtn} onClick={(e)=>this.handleBtnClick(e)}>{this.state.btnText}</button>
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

export default connect(mapStateToProps, {loadCompany})(withRouter(CompanyForm))