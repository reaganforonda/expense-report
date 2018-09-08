module.exports = {
    createUser: (req, res) => {
        const db = req.app.get('db');
        const {
            account_type,
            email,
            firstName,
            lastName,
            temppassword,
            rights,
            adminUser
        } = req.body;

        
        console.log(req.body);

        // Expiration Date for Temp Password
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        console.log()
        if(adminUser.rights.Admin){
            db.CREATE_NEW_USER([account_type, email, temppassword, expireDate, firstName, lastName, rights]).then((result) => {
                console.log(result[0]);
                res.status(500).send(result[0]);
            }).catch((err) => {
                console.log(`Server error while attempting to create new user: ${err}`)
                res.sendStatus(500);
            })
        }
    },

    resetPW: (req, res) => {

    },

    deactiveUser: (req, res) => {

    },

    reactiveUser: (req, res) => {

    }
}