const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback-secret-key',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'todo-app',
      audience: 'todo-app-users'
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key', {
      issuer: 'todo-app',
      audience: 'todo-app-users'
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Authorization header must start with Bearer');
  }

  const token = authHeader.substring(7);
  if (!token) {
    throw new Error('Token is missing from authorization header');
  }

  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader
};
