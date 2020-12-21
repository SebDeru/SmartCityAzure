const {getMemberByMail, addMember} = require('./memberDB');
const {compareHash, getHash} = require('../utils/utils');

module.exports.getUser = async(client, mail, password) => {
    const promises = [];
    const promiseMember = getMemberByMail(mail, client);
    promises.push(promiseMember);
    const values = await Promise.all(promises);
    const memberRow = values[0].rows[0];
    if(memberRow !== undefined && await compareHash(password, memberRow.password)){
        if(memberRow.isadmin) {
            return {userType: "admin", value: memberRow};
        } else{
            return {userType: "client", value: memberRow};
        }
    } else{
        return {userType: "inconnu", value: null};
    }
};

module.exports.addUser = async(username, mail, password, client) => {
    await addMember(username, mail, password, client);
}
