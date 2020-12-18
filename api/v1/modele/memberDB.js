module.exports.getMembers = async(client) => {
    return await client.query("SELECT id, pseudo, mail FROM member");
}

module.exports.getMember = async(id, client) => {
    return await client.query("SELECT * FROM member WHERE id = $1", [id]);
}

module.exports.getMemberByMail = async(mail, client) => {
    return await client.query("SELECT * FROM member WHERE mail = $1", [mail]);
}

module.exports.updateMember = async(id, pseudo, mail, password, client) => {
    if (password === null)
        return await client.query("UPDATE member SET pseudo = $1, mail = $2 WHERE id = $3", [pseudo, mail, id]);
    else
        return await client.query("UPDATE member SET pseudo = $1, mail = $2, password = $3 WHERE id = $4", [pseudo, mail, password, id]);
}

module.exports.deleteMembers = async(membersId, client) => {
    let query = "DELETE FROM member";
    const whereIN = [];
    for(let i in membersId){
        whereIN.push(`$${parseInt(i) + 1}`);
    }
    query += " WHERE id IN (" + whereIN.join(',') + ')';
    return await client.query(query, membersId);
}

module.exports.addMember = async(userName, mail, password, client) => {
    return await client.query("INSERT INTO member (pseudo, mail, password, isAdmin) VALUES ($1, $2, $3, false)", [userName, mail, password]);
}
