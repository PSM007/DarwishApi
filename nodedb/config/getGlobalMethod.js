(function(){

    let interactor = require("@cloudmpower/interactor_async");

    let loadOtherModules = function(){

        let exceptionManager = require("@cloudmpower/exceptionmanager_async");

        let clientRoutes = require("../router/client/route");

        let database = require("../databases/dbModel/model");

        let apiLoader = require("@cloudmpower/apiloader_async");

        let loginCommand = require("../apiMethods/login/command");

        let loginQuery = require("../apiMethods/login/query");

       // let loginTokenCommand = require("../apiMethods/loginToken/command");

        //let loginTokenQuery = require("../apiMethods/loginToken/query");

        let userQuery = require("../apiMethods/user/query");

        let userCommand = require("../apiMethods/user/command");

        let itemMstQuery = require("../apiMethods/itemMst/query");
        
        let itemMstCommand = require("../apiMethods/itemMst/command");

        let quoteRequestsQuery = require("../apiMethods/quoteRequests/query");
        
        let quoteRequestsCommand = require("../apiMethods/quoteRequests/command");

        let referenceObj = [
            {
                fileName        : "exceptionManager",
                fileObj         : exceptionManager
            },
            {
                fileName        : "database",
                fileObj         : database
            },
            {
                fileName        : "clientRoutes",
                fileObj         : clientRoutes
            },
            {
                fileName        : "apiLoader",
                fileObj         : apiLoader
            },
            {
                fileName        : "loginCommand",
                fileObj         : loginCommand
            },
            {
                fileName        : "loginQuery",
                fileObj         : loginQuery
            },
            // {
            //     fileName        : "loginTokenCommand",
            //     fileObj         : loginTokenCommand
            // },
            // {
            //     fileName        : "loginTokenQuery",
            //     fileObj         : loginTokenQuery
            // },
            {
                fileName        : "userQuery",
                fileObj         : userQuery
            },
            {
                fileName        : "userCommand",
                fileObj         : userCommand
            },
            {
                fileName        : "itemMstQuery",
                fileObj         : itemMstQuery
            },
            {
                fileName        : "itemMstCommand",
                fileObj         : itemMstCommand
            } ,
            {
                fileName        : "quoteRequestsQuery",
                fileObj         : quoteRequestsQuery
            },
            {
                fileName        : "quoteRequestsCommand",
                fileObj         : quoteRequestsCommand
            }
        ];
        interactor.requireHandler(referenceObj);
    };

    module.exports = interactor;

    module.exports.FileName = interactor.fileName();

    loadOtherModules();
})();