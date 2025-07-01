// Response utilities
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, message = 'Something went wrong', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
};

const sendValidationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: Array.isArray(errors) ? errors : [errors],
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError
};
