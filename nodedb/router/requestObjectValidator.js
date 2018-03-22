(function(){
    let paperwork = require("@cloudmpower/utility_async").paperwork;

    module.exports.generalStringValidate = function(arr){
        let schema = [""];

        if(!paperwork.accepted(schema, arr)) throw new Error("Incorrect Body parameters");
        return paperwork.accepted(schema, arr);
    };

    module.exports.onBoardingEmail = function(arr){
        let schema = [{
            "userId"        : "",
            "name"          : "",
            "userName"      : "",
            "password"      : "",
            "emailId"       : "",
            "mobileNo"      : ""
        }];

        if(!paperwork.accepted(schema, arr)) throw new Error("Incorrect Body parameters");
        return paperwork.accepted(schema, arr);
    };

})();