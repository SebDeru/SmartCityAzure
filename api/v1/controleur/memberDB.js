const pool = require('../modele/database');
const MemberModel = require('../modele/memberDB');
const ParticipationModel = require('../modele/participationDB');
const {getHash} = require('../utils/utils');
/**
 * @swagger
 * components:
 *  schemas:
 *      Member:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              pseudo:
 *                  type: string
 *              mail:
 *                 type: string
 *              password:
 *                  type: string
 *                  format: password
 *              isAdmin:
 *                  type: boolean
 *      ArrayOfMembers:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * components:
 *  responses:
 *      MembersFound:
 *          description: A list of members
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArrayOfMembers'
 *
 */
module.exports.getMembers = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows : members} = await MemberModel.getMembers(client);
        if(members[0] !== undefined)
            res.json(members)
        else
            res.sendStatus(404);
    }catch (error){
        res.sendStatus(500);
    }finally {
        client.release();
    }
}


/**
 * @swagger
 * components:
 *  responses:
 *      MemberFound:
 *          description: A member
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Member'
 *
 */
module.exports.getMember = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        const {rows : members} = await MemberModel.getMember(id, client);
        const member = members[0];
        if(member !== undefined)
            res.json(member);
        else
            res.sendStatus(404);
    }catch (error){
        res.sendStatus(500);
    }finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      MemberUpdated:
 *          description: The member has been updated
 *  requestBodies:
 *      MemberToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Member'
 *
 */
module.exports.updateMember = async (req, res) => {
    const client = await pool.connect();
    const {id, pseudo, mail, password} = req.body;
    try{
        await MemberModel.updateMember(id, pseudo, mail, await getHash(password), client);
        res.sendStatus(204);
    }catch (error){
        if(error.message.includes('"member_pseudo_key"')){
            res.status(404).send({message: "This pseudo already exists!"});
        }else if(error.message.includes('"member_mail_key"')){
            res.status(404).send("This email already exists!");
        }else{
            res.sendStatus(500);
        }
    }finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      MembersDeleted:
 *          description: members have been deleted
 *  requestBodies:
 *      MembersToDelete:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          membersID:
 *                              type: array
 *                              items:
 *                                  type: integer
 */
module.exports.deleteMembers = async (req, res) => {
    const client = await pool.connect();
    const {membersID} = req.body;
    try{
        if (membersID.length > 0) {
            await ParticipationModel.deleteParticipationsByMembers(membersID, client);
            await MemberModel.deleteMembers(membersID, client);
        }
        res.sendStatus(204);
    }catch (error){
        res.sendStatus(500);
    }finally {
        client.release();
    }
}