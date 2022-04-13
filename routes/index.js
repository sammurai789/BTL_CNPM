const musicRoute = require('./admin/musicRoute');
const userRoute = require('./admin/userRoute');
const homeRoute = require('./user/home')

const routes = [
    musicRoute,
    userRoute,
    homeRoute
]

module.exports = routes;