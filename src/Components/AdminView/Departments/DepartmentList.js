import React from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadDepartments} from '../../../ducks/companyReducer';

export class DepartmentList extends React.Component {
    constructor(props) {
        super(props);

        this.state={}
    }

    componentDidMount(){
        this.props.loadDepartments(this.props.companyID, this.props.userID);
    }

    render(){
        let departments = []
        if(this.props.company.departmentLoading === false){
            departments = this.props.departments.map((value, index) => {
                return (
                    <div className='row' key={value.name+index}>
                        {value.name}
                    </div>
                )
            })
        }

        return (
            <div className='department-list'>
                {
                    this.props.company.departmentLoading ? <div>Loading</div> : <div>{departments}</div>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        company: state.companyReducer,
        departments: state.companyReducer.departments
    }
}

export default connect(mapStateToProps, {loadDepartments})(withRouter(DepartmentList))