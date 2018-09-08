module.exports = {
    createNewReport : (req, res) => {
        const db = req.app.get('db');
        const {
            employee,
            reportDate,
            description,
            user
        } = req.body;

        console.log(req.body);

        // if(user.rights.Expense) {
        //     db.CREATE_NEW_EXP_REPORT([employee, reportDate, description]).then((result) => {
        //         res.status(200).send(result);
        //     }).catch((err)=> {
        //         consol.log(`Server error while attempting to create new report: ${err}`);
        //         re.sendStatus(500);
        //     })
        // } else {
        //     res.sendStatus(401);
        // }
    },

    editExpenseReport : (req, res) => {

    },

    deleteExpenseReport : (req, res) => {

    },

    approveExpenseReport: (req, res) => {

    },

    getExpenseReports : (req, res) => {

    }
}