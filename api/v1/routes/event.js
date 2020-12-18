const Router = require("express-promise-router");
const router = new Router();

const JWTMiddleware = require("../middleware/identificationJWT");
const EventControleur = require('../controleur/eventDB');

/**
 * @swagger
 * /event/{id}:
 *  get:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Event ID
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/EventFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Event not found
 *          500:
 *              description: Server error
 */
router.get('/:id',JWTMiddleware.identification, EventControleur.getEvent);

/**
 * @swagger
 * /event:
 *  post:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          201:
 *              $ref: '#/components/responses/EventAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */
router.post('/',JWTMiddleware.identification, EventControleur.addEvent);

/**
 * @swagger
 * /event:
 *  patch:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/EventToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/EventUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Event not found
 *          500:
 *              description: Server error
 */
router.patch('/',JWTMiddleware.identification, EventControleur.updateEvent);

/**
 * @swagger
 * /event/{id}:
 *  delete:
 *      tags:
 *          - Event
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Event ID
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              $ref: '#/components/responses/EventDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */
router.delete('/:id', JWTMiddleware.identification, EventControleur.deleteEvent);

module.exports = router;