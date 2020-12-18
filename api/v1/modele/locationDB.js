module.exports.getLocations = async(client) => {
    return await client.query("SELECT * FROM location");
}