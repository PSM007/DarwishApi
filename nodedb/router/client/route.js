(function () {

    module.exports = [
        {
            "path"             : "/loginserver/login/create",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "createUser",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/login/update",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "userDataUpdate",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/login/activate",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "activateLogin",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/login/deactivate",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "deActivateLogin",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/login/user",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginQuery",
            "handler"          : "validateLogin",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/logout/user",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "userLogout",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/user/list",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginQuery",
            "handler"          : "listAllUser",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/get/user/info",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginQuery",
            "handler"          : "findUserData",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/user/search/pattern",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginQuery",
            "handler"          : "listAllUserPattern",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/validate/token",
            "method"           : "post",
            "model"            : "LoginToken",
            "module"           : "loginTokenQuery",
            "handler"          : "verifyLoginToken",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/login/delete",
            "method"           : "post",
            "model"            : "Login",
            "module"           : "loginCommand",
            "handler"          : "deleteUser",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/get/user/report",
            "method"           : "post",
            "model"            : "LoginToken",
            "module"           : "loginTokenQuery",
            "handler"          : "userReportList",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/loginserver/get/user/reportDetail",
            "method"           : "post",
            "model"            : "LoginToken",
            "module"           : "loginTokenQuery",
            "handler"          : "userReportListDetail",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/login/user",
            "method"           : "post",
            "model"            : "User",
            "module"           : "userQuery",
            "handler"          : "loginUser",
            "contentType"      : "application/json"
        },
        {
            "path"             : "/item/list",
            "method"           : "post",
            "model"            : "ItemMaster",
            "module"           : "itemMstQuery",
            "handler"          : "listItem",
            "contentType"      : "application/json"
        }
        ,
        {
            "path"             : "/item/insert",
            "method"           : "post",
            "model"            : "QuoteRequest",
            "module"           : "quoteRequestsQuery",
            "handler"          : "insertItem",
            "contentType"      : "application/json"
        }
        ,
        {
            "path"             : "/item/user/list",
            "method"           : "post",
            "model"            : "QuoteRequest",
            "module"           : "quoteRequestsQuery",
            "handler"          : "listAllItems",
            "contentType"      : "application/json"
        }
       
    ];

})();