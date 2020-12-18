module.exports.getCategories = async(client) => {
    return await client.query("SELECT * FROM category");
}