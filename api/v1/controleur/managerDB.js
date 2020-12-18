require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../modele/database');
const userDB = require('../modele/userDB');

module.exports.login = async (req, res) => {
    const {mail, password} = req.body;
    if(mail === undefined || password === undefined){
        res.sendStatus(500);
    } else{
        const client = await pool.connect();
        try{
            const result = await userDB.getUser(client, mail, password);
            const {userType, value} = result;
            if(userType !== "admin") {
                res.sendStatus(404);
            }else {
                const {pseudo} = value;
                const payload = {status : userType, value : {pseudo}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '10800000'}
                );
                res.json(token);
            }
        }catch (e){
            res.sendStatus(500);
        }finally {
            client.release();
        }
    }
};