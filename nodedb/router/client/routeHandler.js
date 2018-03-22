(function(){

    let send = require("koa-send");

    let getMethod = require("../../config/getGlobalMethod");

    let methodName = getMethod.FileName;

    let apiLoader = getMethod(methodName.apiLoader);

    let routes = getMethod(methodName.clientRoutes);

    module.exports = function (router) {

        apiLoader(router, routes);
    };
})();