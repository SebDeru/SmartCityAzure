const pool = require('../modele/database');
const ParticipationModele = require('../modele/participationDB');
/**
 * @swagger
 * components:
 *  schemas:
 *      Participation:
 *          type: object
 *          properties:
 *              eventID:
 *                  type: integer
 *              memberId:
 *                  type: integer
 *              memberFunction:
 *                 type: string
 */


/**
 * @swagger
 * components:
 *  responses:
 *      ParticipationFound:
 *          description: a participation
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Participation'
 *
 */
module.exports.getParticipation = async(req, res) => {
    const client = await pool.connect();
    const eventId = req.query.eventId;
    const userEmail = req.query.userEmail;
    try{
        const {rows: participations} = await ParticipationModele.getParticipation(eventId, userEmail, client);
        if(participations[0] !== undefined){
            res.json(participations[0]);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      ParticipationAdded:
 *          description: a participation has been added
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Participation'
 *      UserOrEventUnknown:
 *          description: the given user and/or event are unknown'
 *
 */
module.exports.addParticipation = async(req, res) => {
    const client = await pool.connect();
    const eventId = req.query.eventId;
    const userEmail = req.query.userEmail;
    const userFunction = req.query.userFunction;
    try{
        const {rows: participations} = await ParticipationModele.addParticipation(eventId, userEmail, userFunction, client);
        if(participations[0] !== undefined){
            res.json(participations[0]);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      ParticipationDeleted:
 *          description: the participation has been deleted
 */
module.exports.deleteParticipation = async(req, res) => {
    const client = await pool.connect();
    const eventId = req.query.eventId;
    const userEmail = req.query.userEmail;
    try{
        await ParticipationModele.deleteParticipation(eventId, userEmail, client);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}