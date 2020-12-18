module.exports.deleteParticipationsByEvents = async(eventsID, client) => {
    let query = "DELETE FROM participation";
    const whereIN = [];
    for(let i in eventsID){
        whereIN.push(`$${parseInt(i) + 1}`);
    }
    query += " WHERE eventId_fk IN (" + whereIN.join(',') + ')';
    return await client.query(query, eventsID);
}

module.exports.deleteParticipationsByEvent = async(eventID, client) => {
    return await client.query("DELETE FROM participation WHERE eventId_fk = $1", [eventID]);
}

module.exports.deleteParticipationsByMembers = async(membersID, client) => {
    let query = "DELETE FROM participation";
    const whereIN = [];
    for(let i in membersID){
        whereIN.push(`$${parseInt(i) + 1}`);
    }
    query += " WHERE memberId_fk IN (" + whereIN.join(',') + ')';
    return await client.query(query, membersID);
}

module.exports.getParticipation = async(eventId, userEmail, client) => {
    return await client.query("SELECT participation.memberId_fk, participation.eventId_fk, participation.functionName_fk FROM participation, member WHERE participation.eventId_fk = $1 AND member.mail = $2 AND member.id = participation.memberId_fk", [eventId, userEmail]);
}

module.exports.addParticipation = async(eventId, userEmail, userFunction, client) => {
    return await client.query("INSERT INTO participation (eventId_fk, memberId_fk, functionName_fk) VALUES ($1, (SELECT id FROM member WHERE mail = $2), $3) RETURNING *", [eventId, userEmail, userFunction]);
}

module.exports.deleteParticipation = async(eventId, userEmail, client) => {
    return await client.query("DELETE FROM participation WHERE eventId_fk = $1 AND memberId_fk = (SELECT id FROM member WHERE mail = $2)", [eventId, userEmail])
}