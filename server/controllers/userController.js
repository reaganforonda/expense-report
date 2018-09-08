const bcrypt = require('bcryptjs');

module.exports = {
    createUser: async (req, res) => {
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

        // Expiration Date for Temp Password
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        
        if(adminUser.rights.Admin){
            await db.CHECK_EMAIL([email.toLowerCase()]).then((users) => {
                if(users.length !== 0) {
                    if(users[0].email === lowerEmail) {
                        res.sendStatus(400);
                    }
                } else {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(temppassword, salt);
                    
                    db.CREATE_NEW_USER([account_type, email, hash, expireDate, firstName, lastName, rights]).then((result) => {
                        res.status(200).send(result[0].user_id.toString());
                    }).catch((err) => {
                        console.log(`Server error while attempting to create new user: ${err}`)
                        res.sendStatus(500);
                    });
                }
            }).catch((err) => {
                console.log(`Server error while attempting to check emails for duplicates: ${err}`);
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