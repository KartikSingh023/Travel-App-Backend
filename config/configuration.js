require('dotenv').config()

const port = process.env.PORT || 8080;
const mongoDbUrl = process.env.MONGODB_URL;
module.exports = { port, mongoDbUrl };
