require('dotenv').config();

module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PORT: process.env.PORT || 3000,
};
