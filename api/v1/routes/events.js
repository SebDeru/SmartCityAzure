const AuthoMiddleware = require("../middleware/authorization");
const JWTMiddleware = require("../middleware/identificationJWT");
const Router = require("express-promise-router");
const router = new Router();

const EventControleur = require('../controleur/eventDB');


/**
 * @swagger
 * /events:
 *  get:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/EventsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Events not found
 *          500:
 *              description: Server error
 */
router.get('/', JWTMiddleware.identification, EventControleur.getEvents);

/**
 * @swagger
 * /events/byParticipation:
 *  get:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: userMail
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          200:
 *              $ref: '#/components/responses/EventsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Events not found
 *          500:
 *              description: Server error
 */
router.get('/byParticipation', JWTMiddleware.identification, EventControleur.getEventsByParticipation);

/**
 * @swagger
 * /events/byManagement:
 *  get:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: userMail
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          200:
 *              $ref: '#/components/responses/EventsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Events not found
 *          500:
 *              description: Server error
 */
router.get('/byManagement', JWTMiddleware.identification, EventControleur.getEventsByManagement);

/**
 * @swagger
 * /events:
 *  delete:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/EventsDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          500:
 *              description: Server error
 *      requestBody:
 *          $ref: '#/components/requestBodies/EventsToDelete'
 *
 */
router.delete('/',JWTMiddleware.identification, AuthoMiddleware.mustBeAdmin, EventControleur.deleteEvents);

module.exports = router;