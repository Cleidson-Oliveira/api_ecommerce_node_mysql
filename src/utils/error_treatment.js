const {
	clientErrorMessages,
	orderErrorMessages,
	productErrorMessages,
	generalErrorMessages
} = require("./error_messages");

const errorTreatment = (errorMessage, response) => {
	switch (errorMessage) {
	case clientErrorMessages.notfound:
	case productErrorMessages.notfound:
	case orderErrorMessages.notfound:
		response.status(404).json({"error": errorMessage});
		break;

	case generalErrorMessages.invalidIdType:
	case generalErrorMessages.invalidIdValue:
	case clientErrorMessages.cpfAlreadyExists:
	case orderErrorMessages.invalidClientIdOrProductId:
		response.status(400).json({"error": errorMessage});
		break;
      
	default:
		response.status(500).json({"error": errorMessage});
		break;
	}
};

module.exports = errorTreatment;