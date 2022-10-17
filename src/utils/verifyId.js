const { generalErrorMessages } = require("./error_messages");

function verifyId (reqId) {
	const id = parseInt(reqId);
    
	if (id <= 0) {
		throw new RangeError(generalErrorMessages.invalidIdValue);
	}
	if (!id) {
		throw new TypeError(generalErrorMessages.invalidIdType);
	}
}

module.exports = verifyId;