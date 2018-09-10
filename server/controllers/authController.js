const axios = require('axios');
const bcrypt = require('bcryptjs');

module.exports = {
    register : async (req, res, next) => {
        const db = req.app.get('db');
        const {
            acct_type,
            firstName,
            lastName,
            email,
            pw,
            confirmPW,
            companyName,
            address,
            city,
            state,
            zipcode,
            phone
        } = req.body

        let lowerEmail = email.toLowerCase();

        if(pw !== confirmPW) {
            res.sendStatus(400);
        };

        if(pw.length > 25 && confirmPW.length > 25 ){
            res.sendStatus(400);
        };

        if(acct_type === 1) {
            await db.CHECK_EMAIL([lowerEmail]).then((users) => {
                if(users.length !== 0) {
                    if(users[0].email === lowerEmail) {
                        res.status(400).send('Please Login');
                    }
                } else {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(confirmPW, salt);
                    const rights= {
                        "Admin" : true,
                        "Approve" : false,
                        "Expense" : false
                    }

                    db.CREATE_ENTERPRISE_USER([acct_type, lowerEmail, hash, firstName, lastName, rights]).then((user) => {
                        db.CREATE_COMPANY([companyName, address, city, state, zipcode, phone, user[0].user_id]).then((company) => {
                            db.REG_CREATE_EMPLOYEE([company[0].company_id, user[0].user_id, firstName, lastName, email]).then((employee) => {
                                res.status(200).send('New Employee')
                            }).catch((err) => {
                                console.log(`Server error while attempting to create employee during registration: ${err}`)
                                res.sendStatus(500);
                            })
                        }).catch((err) => {
                            console.log(`Server error while attempting to create company during registration: ${err}`);
                            res.sendStatus(500);
                        })
                    }).catch((err) => {
                        console.log(`Server error while attemtping to create enterprise user: ${err}`);
                        res.sendStatus(500);
                    })
                }
            })
        } else if(acct_type === 2) {
            await db.CHECK_EMAIL([lowerEmail]).then((users) => {
                if(users.length !== 0) {
                    if(users[0].email === lowerEmail) {
                        res.status(400).send('Please Login');
                    }
                } else {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(confirmPW, salt);

                    db.CREATE_INDIVIDUAL_USER([acct_type, lowerEmail, hash, firstName, lastName]).then((user) => {
                        res.status(200).send('User Created');
                    }).catch((err) => {
                        console.log(`Server error while attemtping to create Individual user: ${err}`);
                        res.sendStatus(500);
                    })
                }
            })
        }
    },
    
    login: (req, res, next) => {
        const db = req.app.get('db');

        const {email, password} = req.body;
        let lowerEmail = email.toLowerCase();

        db.CHECK_EMAIL([lowerEmail]).then((user) => {
            
            if(user.length === 0) {
                res.sendStatus(401);
            }

            if(user.length !== 0){
                const userID = user[0].user_id;
                const userPW = user[0].pw;
                
                if(user[0].temppassword) {
                    const confirmedPW = bcrypt.compareSync(password, user[0].temppassword);
                    const date = new Date();
                    const expiration = user[0].tempexpiration
                    expired = date > expiration;

                    if(confirmedPW && !expired) {
                        req.session.user.user_id = userID;
                        req.session.user.acct_type = user[0].account_type;
                        let loggedUser = {
                            user_id : user[0].user_id,
                            first_name: user[0].first_name,
                            last_name: user[0].last_name,
                            title: user[0].title,
                            company: user[0].company,
                            department: user[0].department,
                            acct_type: user[0].account_type,
                            rights: user[0].rights,
                            updatePWRequired: true,
                            employee_id: user[0].employee_id,
                            email: user[0].email
                        }
                        console.log(loggedUser)
                        let loginDate = new Date();
                        db.UPDATE_LOGIN([loginDate, user[0].user_id, user[0].email] ).then((result )=> {
                            res.status(200).send(loggedUser);
                        }).catch((err) => {
                            console.log(`Server error while attempting to update login date: ${err}`);
                            res.sendStatus(500);
                        })
                    } else {
                        res.sendStatus(401);
                    }
                }else {
                
                const confirmedPW = bcrypt.compareSync(password, userPW)

                if(confirmedPW){
                    req.session.user.user_id = user[0].user_id;
                    req.session.user.acct_type = user[0].account_type;
                    let loggedUser = {
                        user_id : user[0].user_id,
                        first_name: user[0].first_name,
                        last_name: user[0].last_name,
                        title: user[0].title,
                        department: user[0].department,
                        acct_type: user[0].account_type,
                        company: user[0].company,
                        rights: user[0].rights,
                        email: user[0].email,
                        employee_id: user[0].employee_id,
                        updatePWRequired: false
                    }
                    console.log(loggedUser)
                    let loginDate = new Date();
                    db.UPDATE_LOGIN([loginDate, user[0].user_id, user[0].email] ).then((result )=> {
                        res.status(200).send(loggedUser);
                    }).catch((err) => {
                        console.log(`Server error while attempting to update login date: ${err}`);
                        res.sendStatus(500);
                    })
                } else {
                    res.sendStatus(401);
                }
            }}
        }).catch((err) => {
            console.log(`Server error while attempting to login user: ${err}`);
            res.sendStatus(500);
        })
    },

    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send();
    },

    validate: (req, res, next) => {
        let user = req.session.user;
        console.log(user);
        if(req.session.user.user_id) {
            res.status(200).send(user);
        } else {
            res.status(401).send('Unauthorized');
        }
    },

    updatePW: (req, res, next) => {
        const db = req.app.get('db');
        const {user, newPW, currentPW, confirmPW} = req.body

        db.CHECK_EMAIL([user.email.toLowerCase()]).then((users)=> {
            if(users.length ===0 ) {
                res.sendStatus(401);
            } else if (users.length !== 0) {
                const userID = users[0].user_id;
                const tempPW = users[0].temppassword;
                const confirmedPW = bcrypt.compareSync(currentPW, tempPW);
                

                if(userID === user.user_id && confirmedPW && (newPW === confirmPW)){
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(confirmPW, salt);
                    const login = new Date();

                    db.UPDATE_PASSWORD([userID, users[0].email, hash, login]).then((result) => {
                        res.sendStatus(200);
                    }).catch((err) => {
                        console.log(`Server error while attempting to update password: ${err}`);
                        res.sendStatus(500);
                    })
                } else {
                    res.sendStatus(401);
                }
            }
        })
    },
}