require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../modele/database');
const userDB = require('../modele/userDB');
const {getHash} = require('../utils/utils');

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              mail:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - mail
 *              - password
 */

/**
 * @swagger
 * components:
 *  responses:
 *      JWTCreated:
 *          description: The JWT has been created
 *  requestBodies:
 *      JWTToCreate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 */
module.exports.login = async (req, res) => {
    const {mail, password} = req.body;
    if(mail === undefined || password === undefined){
        res.sendStatus(500);
    } else{
        const client = await pool.connect();
        try{
            const result = await userDB.getUser(client, mail, password);
            const {userType, value} = result;
            if(userType === "inconnu")
                res.sendStatus(404);
            else {
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

/**
 * @swagger
 * components:
 *  responses:
 *      UserSignedUp:
 *          description: The JWT has been created and the user has been added
 *      UserAlreadySignedUp:
 *          description: The user has been already signed up
 *  requestBodies:
 *      UserToSignUp:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          mail:
 *                              type: string
 *                          password:
 *                              type: string
 *                              format: password
 *                      required:
 *                          - username
 *                          - mail
 *                          - password
 */
module.exports.signup = async(req, res) => {
    const {username, mail, password} = req.body;
    if (username === undefined || mail === undefined || password === undefined){
        res.sendStatus(500);
    } else {
        const client = await pool.connect();
        try{
            await userDB.addUser(username, mail, await getHash(password), client);
            const payload = {status: "client", value: username};
            const token = jwt.sign(
                payload,
                process.env.SECRET_TOKEN,
                {expiresIn: '10800000'}
            );
            res.json(token);
        } catch (e){
            res.status(400).json({error: "user already signed up"});
        } finally {
            client.release();
        }
    }
}