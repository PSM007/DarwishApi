(function(){

    let koaRouter = require('koa-router');

    let bodyParser = require("koa-bodyparser");

    let dbResolver = require("@cloudmpower/dbresolver_async");

    let scheme = require("koa-scheme");

    let schemeValidator = require("./routeValidator");

    let getMethod = require("../../config/getGlobalMethod");

    let methodName = getMethod.FileName;

    module.exports = middleware;

    function middleware (app, mongoDB, config){

        app.use(mongoDB(config.databaseSetting));

        // logger
        app.use(async (ctx, next) => {

            const start = new Date();
            await next();

            const ms = new Date() - start;
            let statusTag = "Error";
            if(ctx.status == 200) statusTag = "Success";
            if(typeof ctx.utils == "undefined") ctx.utils = getMethod(methodName.utils);
            ctx.utils.log(JSON.stringify({ dated: start, method: ctx.method, url: ctx.url, time: ms, status: ctx.status, request: JSON.stringify(ctx.request.body), response: JSON.stringify(ctx.body)}), "Middleware,"+ statusTag, ctx.config);
        });

        //Block Direct Access
       // app.use(getMethod(methodName.serverBlocker));

        //Body Parser
        app.use(bodyParser({jsonLimit: "5mb"}));

        app.use(async (ctx, next) => {
            ctx.config = config;
            await next();
        });

        //Request/Response Body Validation
        app.use(scheme(schemeValidator));

        //DB Service Check
        app.use(async (ctx, next) => {
            await dbResolver(mongoDB, ctx, next);
        });

        let router = new koaRouter();
        require('./routeHandler')(router);

        app.use(router.routes());
        app.use(router.allowedMethods());

        // uses async functions
        app.use(async (ctx) => {
            const response = {"status": 404, "responseData": { "errorCode": "ERR404", "message": "Requested resource was not found" }};
            ctx.status = response.status;
            ctx.body = response;
        });

        return app;
    }
})();