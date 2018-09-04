const axios = require('axios');
const bcrypt = require('bcryptjs');

module.exports = {
    register : async (req, res, next) => {
        const db = req.app.get('db');
        const {
            firstName,
            lastName,
            email,
            pw,
            confirmPW
        } = req.body

        console.log(req.body);
        if(pw !== confirmPW) {
            res.sendStatus(400);
        };

        if(pw.length > 20 && confirmPW.length > 20 ){
            res.sendStatus(400);
        };

        await db.CHECK_EMAIL([email]).then((users) => {
            if(users.length !== 0){
                if(users[0].email === email) {
                    res.status(400).send('Please Login')
                }
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(confirmPW, salt);

                db.CREATE_USER([email, hash, firstName, lastName, 1]).then((user) => {
                    res.status(200).send('User Created');
                }).catch((err) => {
                    console.log(`Server error while attempting to create user: ${err}`);
                    res.sendStatus(500);
                })
            }
        }).catch((err) => {
            console.log(`Server error while attempting to search emails: ${err}`);
            res.sendStatus(500);
        })
    },
    
    login: (req, res, next) => {
        const db = req.app.get('db');
    },

    logout: (req, res, next) => {
        const db = req.app.get('db');
    },

    validate: (req, res, next) => {
        const db = req.app.get('db');
    }
}