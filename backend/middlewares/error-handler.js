

// returns a status code and a descriptive packet to be returned to the user
const errorHandler = (error, callback) => {
  const errorPacket = {
    status: 500,
    message: {
      userMessage: 'Internal server error',
      internalMessage: error.toString(),
    },
  };

  if (error.message === 'not found') {
    errorPacket.status = 404;
    errorPacket.message = {
      userMessage: 'Ressource not found',
      internalMessage: `The requested ${error.resource} does not exist`,
    };
  }

  callback(errorPacket);
};

module.exports = errorHandler;
