const Router = require("express-promise-router");
const router = new Router();

const JWTMiddleware = require("../middleware/identificationJWT");
const ParticipationControleur = require('../controleur/participationDB');

/**
 * @swagger
 * /participation:
 *  get:
 *      tags:
 *          - Participation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: eventID
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: userEmail
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ParticipationFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              description: Participation not found
 *          500:
 *              description: Server error
 */
router.get('/', JWTMiddleware.identification,  ParticipationControleur.getParticipation);

/**
 * @swagger
 * /participation:
 *  post:
 *      tags:
 *          - Participation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: eventID
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: userEmail
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: userFunction
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ParticipationAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          404:
 *              $ref: '#/components/responses/UserOrEventUnknown'
 *          500:
 *              description: Server error
 */
router.post('/', JWTMiddleware.identification, ParticipationControleur.addParticipation);

/**
 * @swagger
 * /participation:
 *  delete:
 *      tags:
 *          - Participation
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: eventID
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: userEmail
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ParticipationDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 */
router.delete('/', JWTMiddleware.identification, ParticipationControleur.deleteParticipation);

module.exports = router;