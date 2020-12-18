const Router = require("express-promise-router");
const router = new Router();

const JWTMiddleware = require("../middleware/identificationJWT");
const LocationControleur = require('../controleur/locationDB');

/**
 * @swagger
 * /locations:
 *  get:
 *      tags:
 *          - Location
 *      responses:
 *          200:
 *              $ref: '#/components/responses/LocationsFound'
 *          404:
 *              description: Locations not found
 *          500:
 *              description: Server error
 */
router.get('/',JWTMiddleware.identification, LocationControleur.getLocations);

module.exports = router;