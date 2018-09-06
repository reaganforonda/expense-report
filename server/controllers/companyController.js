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

        
    },

    createEmployee: (req, res) => {
        const db = req.app.get('db');
        const {} = req.body;


    }
}