const model = require('../models/userSchema');

// check if user exists in our system by google id_token, if yes send in the data the authorization of the user
async function checkUser(req, res) {
    try {
        console.log('req.body\n',req.body.google_id);
        // const jsonRes = JSON.parse(req.body);
        // console.log('jsonRes\n',jsonRes.);
        

        
        const data = await model.findUser(req.body.google_id);
        if (data.length == 0) {
            res.status(200).json({
                status: 200,
                message: "No user was found for this google_id",
                action: "Read",
                data: null
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "success",
                action: "Read",
                data: data[0].isAdmin
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message,
            action: "Read",
            data: null
        })
    }

}

async function createClientUser(req, res) {
    try {
        const data = await model.createNewClientUser(req.body.google_id);
        res.status(200).json({
            status:200,
            message: "success",
            action: "Create",
            data: data
        })

    } catch (err) {
        res.status(500).json({
            status:500,
            message: err.message,
            action: "Create",
            data: null
        })
    }
}

module.exports = {
    checkUser,
    createClientUser
};