module.exports = {
    createNewCompany: (req, res) => {
        const db = req.app.get('db');
        const {
            name, address, city,
            state, phone, admin, zipcode
        } = req.body;

        db.CREATE_COMPANY([name, address, city, state, zipcode, phone, admin]).then((result) => {
            res.status(200).send(result[0]);
        }).catch((err) => {
            console.log(`Server error while attempting to create new company: ${err}`);
            res.sendStatus(500);
        })
    },

    editCompany: (req, res) => {
        const db = req.app.get('db');
        const {
            name, address, city,
            state, phone, admin, zipcode, companyID
        } = req.body;

        db.UPDATE_COMPANY([name, address, city, state, zipcode, phone, admin, companyID]).then((result) => {
            res.status(200).send(result[0]);
        }).catch((err) => {
            console.log(`Server error while attempting to update company: ${err}`);
            res.sendStatus(500);
        })
    },

    getCompany: (req, res) => {
        const db = req.app.get('db');
        const {userID} = req.params;

        db.GET_COMPANY([userID]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(`Server error while attempting to retrieving company: ${err}`);
            res.sendStatus(500);
        })
    },

    getDepartments: (req, res) => {
        const db = req.app.get('db');
        const {companyID, userID} = req.query;
        

        db.GET_DEPARTMENTS([companyID, userID]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(`Server error while atttempting to retrieve departments: ${err}`);
            res.sendStatus(500);
        })
    },

    addDepartment: (req, res) => {
        const db = req.app.get('db');
        const {companyID, userID} = req.query;
        const {name} = req.body;

        db.CREATE_DEPARTMENT([name, companyID]).then((result) => {
            res.status(200).send(result[0])
        }).catch((err) => {
            console.log(`Server error while attempting to create new department: ${err}`);
            res.sendStatus(500);
        })
    },

    getEmployees: (req, res) => {
        const db = req.app.get('db');
        const {companyID, employeeID, userID, filter} = req.query;

        if(filter !== 'approver') {
        db.GET_EMPLOYEES([companyID, employeeID]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(`Server error while attempting to retrieve employees: ${err}`);
            res.sendStatus(500);
        });}

        if(filter === 'approver'){
            db.GET_APPROVERS([companyID]).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                console.log(`Server error while attempting to retrive approvers: ${err}`);
                res.sendStatus(500);
            })
        }
    },

    createEmployee: (req, res) => {
        const db = req.app.get('db');
        const {
            company,
            firstName,
            lastName,
            department,
            title,
            workPhone,
            email,
            user,
            approver
        } = req.body;
        
        if(user.rights.Admin) {

            if(approver === '') {
                db.CREATE_EMPLOYEE([company, department, firstName, lastName, title, workPhone, email, 0]).then((result) => {
                    res.status(200).send(result[0])
                }).catch((err)=> {
                    console.log(`Server error while attempting to create employee: ${err}`)
                })
            } else {
                db.CREATE_EMPLOYEE([company, department, firstName, lastName, title, workPhone, email, approver]).then((result) => {
                    res.status(200).send(result[0])
                }).catch((err)=> {
                    console.log(`Server error while attempting to create employee: ${err}`)
                })
            }
            

        } else {
            res.sendStatus(401);
        }
    },

    updateEmployee: (req, res) => {
        const db= req.app.get('db');

        const {company, 
            firstName, 
            lastName, 
            department, 
            title, 
            workPhone, 
            email, 
            user,
            user_id,
            approver
        } = req.body

        const {employeeID} = req.query
        

        if(user.rights.Admin ) {
            db.UPDATE_EMPLOYEE([department, firstName, lastName, title, workPhone, email, employeeID, company, user_id, approver]).then((result) => {
                res.status(200).send(result[0]);
            }).catch((err) => {
                console.log(`Server error while attempting to create employee: ${err}`);
            })
        } else {
            res.sendStatus(401);
        }
    }
}