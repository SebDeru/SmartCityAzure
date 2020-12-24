const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10, "a");

module.exports.getHash = (string) => bcrypt.hash(string, saltRounds);

module.exports.compareHash = (string, hash) => bcrypt.compare(string, hash);
