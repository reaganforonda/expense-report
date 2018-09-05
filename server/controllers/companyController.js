module.exports = {
    createNewCompany: (req, res) => {

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