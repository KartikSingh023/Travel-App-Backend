const mongoose = require('')

const USER_DATA = mongoose.connection.collection('users')
const BANNER_DATA = mongoose.connection.collection('banners')
const PACKAGE_DATA = mongoose.connection.collection('packages')

module.exports = { USER_DATA, BANNER_DATA, PACKAGE_DATA }
