const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controleur/userDB');

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - Login
 *      security:
 *          - bearerAuth: []
 *      description: send a JWT token to allow the identification
 *      requestBody:
 *          $ref: '#/components/requestBodies/JWTToCreate'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/JWTCreated'
 *          404:
 *              description: Member not found
 *          500:
 *              description: Server error
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /user:
 *  post:
 *      tags:
 *          - Signup
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/UserToSignUp'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/UserSignedUp'
 *          400:
 *              $ref: '#/components/responses/UserAlreadySignedUp'
 *          500:
 *              description: Server error
 */
router.post('/', userController.signup);

module.exports = router;