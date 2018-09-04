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

        if(pw !== confirmPW) {
            res.sendStatus(400);
        };

        if(pw.length > 25 && confirmPW.length > 25 ){
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

        const {email, password} = req.body;

        db.CHECK_EMAIL([email]).then((user) => {
            if(user.length === 0) {
                res.sendStatus(401);
            }

            if(user.length !== 0){
                const userID = user[0].user_id;
                const userPW = user[0].pw;
                const confirmedPW = bcrypt.compareSync(password, userPW);

                if(confirmedPW){
                    req.session.user.user_id = userID;
                    req.session.user.acct_type = user[0].acct_type;
                    res.status(200).send(user[0]);
                } else {
                    res.sendStatus(401);
                }
            }
        }).catch((err) => {
            console.log(`Server error while attempting to login user: ${err}`);
            res.sendStatus(500);
        })
    },

    logout: (req, res, next) => {
        const db = req.app.get('db');
    },

    validate: (req, res, next) => {
        const db = req.app.get('db');
    }
}