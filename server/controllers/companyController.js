module.exports = {
    createNewCompany: (req, res) => {
        const db = req.app.get('db');
        const {
            name, address, city,
            state, phone, admin, zipcode
        } = req.body;

        console.log(req.body);

        db.CREATE_COMPANY([name, address, city, state, zipcode, phone, admin]).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            console.log(`Server error while attempting to create new company: ${err}`);
            res.sendStatus(500);
        })
    },

    editCompany: (req, res) => {

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
    }
}