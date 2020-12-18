/**
 * @swagger
 * components:
 *  responses:
 *      MustBeAdmin:
 *          description: The desired action can only be done by an admin
 */
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}