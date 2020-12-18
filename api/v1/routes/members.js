const Router = require("express-promise-router");
const router = new Router();

const AuthoMiddleware = require("../middleware/authorization");
const JWTMiddleware = require("../middleware/identificationJWT");
const MemberController = require('../controleur/memberDB');

/**
 * @swagger
 * /members:
 *  get:
 *      tags:
 *          - Member
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              $ref: '#/components/responses/MembersFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          404:
 *              description: Members not found
 *          500:
 *              description: Server error
 */
router.get('/',JWTMiddleware.identification, AuthoMiddleware.mustBeAdmin, MemberController.getMembers);

/**
 * @swagger
 * /members:
 *  delete:
 *      tags:
 *          - Member
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          204:
 *              $ref: '#/components/responses/MembersDeleted'
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
router.delete('/',JWTMiddleware.identification, AuthoMiddleware.mustBeAdmin, MemberController.deleteMembers);

module.exports = router;