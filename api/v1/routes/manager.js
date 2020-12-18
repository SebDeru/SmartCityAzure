const Router = require("express-promise-router");
const router = new Router;
const ManagerController = require("../controleur/managerDB");

/**
 * @swagger
 * /manager/login:
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
router.post('/login', ManagerController.login);

module.exports = router;