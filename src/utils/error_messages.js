const generalErrorMessages = {
    "invalidIdType": "The id should be a number!",
    "invalidIdValue": "The id should be a number greather than 0!",
}
const orderErrorMessages = {
    "notfound" : "There isn't the specificated order!",
    "invalidClientIdOrProductId": "The specificated client Id or product Id there isn't or it's invalid!",
}
const clientErrorMessages = {
    "notfound" : "There isn't the specificated client!",
    "cpfAlreadyExists": "The CPF number already exists!",
}

module.exports = {
    generalErrorMessages,
    orderErrorMessages,
    clientErrorMessages,
}