module.exports = {
    createNewReport : (req, res) => {
        const db = req.app.get('db');
        const {
            date,
            description,
            user,
            reportNumber
        } = req.body;

        const defaultStatus= {
            "Approved" : false,
            "Submitted": false,
            "Rejected" : false
        }

        if(user.rights.Expense) {
            db.CREATE_NEW_EXP_REPORT([user.employee_id, date, description, reportNumber, JSON.stringify(defaultStatus)]).then((result) => {
                res.status(200).send(result);
            }).catch((err)=> {
                console.log(`Server error while attempting to create new report: ${err}`);
                re.sendStatus(500);
            })
        } else {
            res.sendStatus(401);
        }
    },

    editExpenseReport : (req, res) => {
        const db = req.app.get('db');

        const {submit, employeeID, approve} = req.query;
        const {reportID} = req.params
        const {} = req.body;

        if(submit) {
            db.SUBMIT_REPORT([employeeID, reportID]).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                console.log(`Server error while attempting to update report for submission: ${err}`);
                res.sendStatus(500);
            })
        } else if(approve === 'true') {
            db.APPROVE_EXPENSE_REPORT([reportID]).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                console.log(`Server error while attempting to approve report: ${err}`);
                res.sendStatus(500);
            })
        } else if(approve === 'false') {
            db.REJECT_EXPENSE_REPORT([reportID]).then((result) => {
                res.status(200).send(result);
            }).catch(err=> {
                res.sendStatus(500);
            })
        }
    },

    deleteExpenseReport : (req, res) => {

    },

    approveExpenseReport: (req, res) => {

    },

    getExpenseReports : (req, res) => {
        const db = req.app.get('db');
        const {employeeID, reportID, filter} = req.query;

        if(filter === 'pending') {
            db.GET_PENDING_REPORTS([employeeID]).then((result) => {
                res.status(200).send(result) ;
            }).catch((err)=> {
                console.log(`Server error while attempting to get expense reports pending: ${err}`);
                res.sendStatus(500);
            })
        } else {
            db.GET_EXPENSE_REPORTS([employeeID, reportID]).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                console.log(`Server error while attempting to get expense reports; ${err}`);
                res.sendStatus(500);
            })
        }
    },

    getExpenses : (req, res) => {
        const db = req.app.get('db');
        const {employeeID, reportID, expenseID, filter}  = req.query;
        
        if(filter === 'open') {
            db.GET_OPEN_EXPENSES([employeeID]).then((result) => {
                res.status(200).send(result)
            }).catch((err) => {
                console.log(`Server error while attempting to retrieve expenses: ${err}`);
                res.sendStatus(500);
            })    
        } else {
        db.GET_EXPENSES([employeeID, reportID, expenseID]).then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            console.log(`Server error while attempting to retrieve expenses: ${err}`);
            res.sendStatus(500);
        })}

    },

    createExpense : (req, res) => {
        const db = req.app.get('db');
        const {
            user,
            date,
            merchant,
            amount,
            category,
            comment,
            tags
        } = req.body;

        if(user.rights.Expense) {
            db.CREATE_EXPENSE([date, merchant, amount, category, comment, user.employee_id]).then((result) => {
                res.status(200).send(result);
            }).catch((err) => {
                console.log(`Server error while attempting to create new expense: ${err}`);
                res.sendStatus(500);
            })
        } else {
            res.sendStatus(401)
        }
    },

    deleteExpense : (req, res) => {
        const db= req.app.get('db');
    },

    editExpense : (req, res) => {
        const db = req.app.get('db');
        const {reportupdate} = req.query;

        if(reportupdate) {
            const expenses = req.body.expenses;
            const report = req.body.report;
            const user = req.body.user;

            if(user.rights.Expense){
                for(var i=0; i < expenses.length; i ++) {
                    db.ADD_EXPENSE_TO_REPORT([report, expenses[i]]).then((result) => {
                    }).catch(err => {
                        console.log(`Server Error while trying to update expense: ${err} Report: ${report}`);
                        res.sendStatus(400);
                    })
                } res.sendStatus(200);
            }
        }
    }
}