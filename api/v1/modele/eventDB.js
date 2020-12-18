module.exports.getEvents = async(client) => {
    return await
        client.query("SELECT id, eventName, description, price, to_char(startDate, 'DD-MM-YYYY') as startDate, to_char(endDate, 'DD-MM-YYYY') as endDate, category_fk, country_fk FROM event LEFT OUTER JOIN location on event.locationName_fk = location.locationName AND event.locationPostalCode_fk = location.postalCode");
}

module.exports.getEventsByParticipation = async(userMail, client) => {
    return await
        client.query("SELECT id, eventName, description, price, to_char(startDate, 'DD-MM-YYYY') as startDate, to_char(endDate, 'DD-MM-YYYY') as endDate, category_fk, country_fk FROM event, location, participation WHERE event.locationName_fk = location.locationName AND event.locationPostalCode_fk = location.postalCode AND participation.eventId_fk = event.id AND participation.memberId_fk = (SELECT id FROM member WHERE mail = $1)", [userMail]);
}

module.exports.getEventsByManagement = async(userMail, client) => {
    return await
        client.query("SELECT id, eventName, description, price, to_char(startDate, 'DD-MM-YYYY') as startDate, to_char(endDate, 'DD-MM-YYYY') as endDate, category_fk, country_fk FROM event, location, participation WHERE event.locationName_fk = location.locationName AND event.locationPostalCode_fk = location.postalCode AND participation.eventId_fk = event.id AND participation.memberId_fk = (SELECT id FROM member WHERE mail = $1) AND participation.functionName_fk != 'Participant'", [userMail]);
}

module.exports.getEvent = async(id, client) => {
    return await
        client.query("SELECT * FROM event WHERE id = $1", [id]);
}

module.exports.addEvent = async(eventName, description, price, maxParticipantsCount, startDate
    , endDate, isPrivate, streetAndNumber, password, category_fk, locationName_fk, locationPostalCode_fk, client) =>{
    return await
        client.query("INSERT INTO event (eventName, description, price, maxParticipantsCount, startDate, endDate, isPrivate, streetAndNumber, password, category_fk, locationName_fk, locationPostalCode_fk) VALUES ($1, $2, $3, $4, to_timestamp($5, 'YYYY-MM-DD HH24:MI'), to_timestamp($6, 'YYYY-MM-DD HH24:MI'), $7, $8, $9, $10, $11, $12)",
            [eventName, description, price,maxParticipantsCount, startDate, endDate, isPrivate, streetAndNumber, password, category_fk, locationName_fk, locationPostalCode_fk]);
}

module.exports.updateEvent = async(id, eventName, description, price, maxParticipantsCount, startDate
    , endDate, isPrivate, streetAndNumber, password, category_fk, locationName_fk, locationPostalCode_fk, client) => {
    return await
        client.query("UPDATE event SET eventName = $1, description = $2, price = $3, maxParticipantsCount = $4, startDate = to_timestamp($5, 'YYYY-MM-DD HH24:MI'), endDate = to_timestamp($6, 'YYYY-MM-DD HH24:MI'), isPrivate = $7, streetAndNumber = $8, password = $9, category_fk = $10, locationName_fk = $11, locationPostalCode_fk = $12 WHERE id = $13",
            [eventName, description, price,maxParticipantsCount, startDate, endDate, isPrivate, streetAndNumber, password, category_fk, locationName_fk, locationPostalCode_fk, id]);
}

module.exports.deleteEvents = async(eventsId, client) => {
    let query = "DELETE FROM event ";
    const whereIN = [];
    for(let i in eventsId){
        whereIN.push(`$${parseInt(i) + 1}`);
    }
    query += "WHERE id IN (" + whereIN.join(',') + ')';
    return await client.query(query, eventsId);
}

module.exports.deleteEvent = async(eventId, client) => {
    return await client.query("DELETE FROM event WHERE id = $1", [eventId]);
}