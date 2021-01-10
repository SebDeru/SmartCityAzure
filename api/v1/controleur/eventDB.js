const pool = require('../modele/database');
const EventModele = require("../modele/eventDB");
const ParticipationModele = require("../modele/participationDB");
const {getHash} = require('../utils/utils');
/**
 * @swagger
 * components:
 *  schemas:
 *      EventItem:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              eventname:
 *                  type: string
 *                  description: name of the event
 *              description:
 *                 type: string
 *              price:
 *                  type: number
 *                  format: float
 *              startdate:
 *                  type: string
 *                  format: date
 *              enddate:
 *                  type: string
 *                  format: date
 *              category_fk:
 *                  type: string
 *              country_fk:
 *                  type: string
 *      ArrayOfEvents:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/EventItem'
 *      Event:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              eventname:
 *                  type: string
 *                  description: name of the event
 *              description:
 *                 type: string
 *              price:
 *                  type: number
 *                  format: float
 *              maxparticipantscount:
 *                  type: integer
 *                  description: indicate the numbers of participants maximum, if exist
 *              startdate:
 *                  type: string
 *                  format: date-time
 *              enddate:
 *                  type: string
 *                  format: date-time
 *              isprivate:
 *                  type: boolean
 *                  description: indicate if the event is private or not
 *              streetandnumber:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *                  description: password required if private event
 *              category_fk:
 *                  type: string
 *              locationname_fk:
 *                  type: string
 *              locationpostalcode_fk:
 *                  type: string
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      EventsFound:
 *          description: A list of events
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArrayOfEvents'
 *
 */
module.exports.getEvents = async(req, res) => {
    const client = await pool.connect();
    try{
        const {rows : events} = await EventModele.getEvents(client);
        if (events[0] !== undefined){
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getEventsByParticipation = async(req, res) => {
    const client = await pool.connect();
    const userMail = req.query.userMail;
    try{
        const {rows : events} = await EventModele.getEventsByParticipation(userMail, client);
        if (events[0] !== undefined){
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getEventsByManagement = async(req, res) => {
    const client = await pool.connect();
    const userMail = req.query.userMail;
    try{
        const {rows : events} = await EventModele.getEventsByManagement(userMail, client);
        if (events[0] !== undefined){
            res.json(events);
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
 *      EventAdded:
 *          description: An event has been added
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 */
module.exports.addEvent = async(req, res) => {
        const client = await pool.connect();
    const {eventname, description, price, maxparticipantscount
        , startdate, enddate, isprivate, streetandnumber, password, category_fk, locationname_fk, locationpostalcode_fk} = req.body;
    try{
        const id = await EventModele.addEvent(eventname, description, price, maxparticipantscount, startdate
            , enddate, isprivate, streetandnumber, (password != null ? await getHash(password) : password), category_fk, locationname_fk, locationpostalcode_fk, client);
        res.json(id);
    } catch (e) {
        res.sendStatus(500)
    } finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      EventFound:
 *          description: An event
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *
 */
module.exports.getEvent = async(req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        const {rows: events} = await EventModele.getEvent(id, client);
        if(events[0] !== undefined){
            res.json(events[0]);
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
 *      EventUpdated:
 *          description: The event has been updated
 *  requestBodies:
 *      EventToUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *
 */
module.exports.updateEvent = async(req, res) => {
    const client = await pool.connect();
    const {id, eventname, description, price, maxparticipantscount
        , startdate, enddate, isprivate, streetandnumber, password, category_fk, locationname_fk, locationpostalcode_fk} = req.body;
    try{
        const response = await EventModele.updateEvent(id, eventname, description, price, maxparticipantscount, startdate
            , enddate, isprivate, streetandnumber, (password != null ? await getHash(password) : password), category_fk, locationname_fk, locationpostalcode_fk, client);
        if(response)
            res.sendStatus(204);
        else
            res.sendStatus(404);
    } catch (e) {
        res.sendStatus(500)
    } finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      EventDeleted:
 *          description: The event has been deleted
 *
 */
module.exports.deleteEvent = async(req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if (id !== undefined){
            await ParticipationModele.deleteParticipationsByEvent(id, client);
            await EventModele.deleteEvent(id, client);
        }
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      EventsDeleted:
 *          description: events have been deleted
 *  requestBodies:
 *      EventsToDelete:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          eventsID:
 *                              type: array
 *                              items:
 *                                  type: integer
 *
 *
 */
module.exports.deleteEvents = async(req, res) => {
    const client = await pool.connect();
    const {eventsID} = req.body;
    try{
        if (eventsID.length > 0){
            await ParticipationModele.deleteParticipationsByEvents(eventsID, client);
            await EventModele.deleteEvents(eventsID, client);
        }
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
