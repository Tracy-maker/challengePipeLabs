require("dotenv").config();

module.exports = {
  API_URL: process.env.API_URL,
  AUTH: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  PORT: process.env.PORT || 4000,
};
