const Router = require("express-promise-router");
const router = new Router();

const AuthoMiddleware = require("../middleware/authorization");
const JWTMiddleware = require("../middleware/identificationJWT");
const MemberController = require('../controleur/memberDB');

/**
 * @swagger
 * /member/{id}:
 *  get:
 *      tags:
 *          - Member
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Member ID
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/MemberFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          404:
 *              description: Member not found
 *          500:
 *              description: Server error
 */
router.get('/:id',JWTMiddleware.identification, AuthoMiddleware.mustBeAdmin, MemberController.getMember);

/**
 * @swagger
 * /member:
 *  patch:
 *      tags:
 *          - Member
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/MemberToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/MemberUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/MustBeAdmin'
 *          404:
 *              description: Member not found
 *          500:
 *              description: Server error
 */
router.patch('/',JWTMiddleware.identification, AuthoMiddleware.mustBeAdmin, MemberController.updateMember);

module.exports = router;
