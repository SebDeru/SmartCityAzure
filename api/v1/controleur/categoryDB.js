const pool = require('../modele/database');
const CategoryModele = require("../modele/categoryDB");
/**
 * @swagger
 * components:
 *  schemas:
 *      ArrayOfCategories:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  categoryName:
 *                      type: string
 *                      description: name of the category
 *                  childAdmitted:
 *                      type: boolean
 *                      description: is child admitted or not
 *                  mainCategory_fk:
 *                      type: string
 *
 */


/**
 * @swagger
 * components:
 *  responses:
 *      CategoriesFound:
 *          description: A list of categories
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArrayOfCategories'
 *
 */
module.exports.getCategories = async(req, res) => {
    const client = await pool.connect();
    try{
        const {rows : categories} = await CategoryModele.getCategories(client);
        if (categories[0] !== undefined){
            res.json(categories);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}