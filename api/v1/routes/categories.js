const Router = require("express-promise-router");
const router = new Router();

const JWTMiddleware = require("../middleware/identificationJWT");
const CategoryControleur = require('../controleur/categoryDB');

/**
 * @swagger
 * /categories:
 *  get:
 *      tags:
 *          - Category
 *      responses:
 *          200:
 *              $ref: '#/components/responses/CategoriesFound'
 *          404:
 *              description: Categories not found
 *          500:
 *              description: Server error
 */
router.get('/',JWTMiddleware.identification, CategoryControleur.getCategories);

module.exports = router;