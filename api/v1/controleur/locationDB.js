const pool = require('../modele/database');
const LocationModele = require("../modele/locationDB");
/**
 * @swagger
 * components:
 *  schemas:
 *      ArrayOfLocations:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  locationName:
 *                      type: string
 *                      description: name of the location
 *                  postalCode:
 *                      type: integer
 *                  country_fk:
 *                      type: string
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      LocationsFound:
 *          description: A list of locations
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ArrayOfLocations'
 *
 */
module.exports.getLocations = async(req, res) => {
    const client = await pool.connect();
    try{
        const {rows : locations} = await LocationModele.getLocations(client);
        if (locations[0] !== undefined){
            res.json(locations);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    } finally {
        client.release();
    }
}