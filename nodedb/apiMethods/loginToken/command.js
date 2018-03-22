(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let moment =require("moment");

    let methodName = getMethod.FileName;

    let modelName = "LoginToken";

    function checkTokenArray(tokens , request , utils){
        let tokenLen = tokens.length;
        let tokenArr = [];
        for(let i = 0; i < tokenLen; i++){
            let tokenList = { "token": tokens[i].token, "validity" : tokens[i].validity };
            let returnPoint = false;

            let tokenValidity = tokenList.validity;
            let dateNow = utils.getUTCTime();

            if(tokenList.token == request.loginVerificationToken) returnPoint = true;
            if((utils.getDateInTime(dateNow)) > (utils.getDateInTime(tokenValidity))) returnPoint = true;
            if(!returnPoint) tokenArr.push(tokenList);
        }

        return tokenArr;
    }

    module.exports.createLoginToken = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;
        let dt = moment().format("DD/MM/YYYY HH:MM:SS");

        let query = { "userId": request.userId };
        let addToTokens = { "token": request.loginToken, "validity": utils.getUTCEndTime() };
        request.loginVerificationToken = [addToTokens];
        let loginLog = { "userLoginStatus": "Success", "userLoginDate": dt };
        request.userLog = [loginLog];
        let result = {};
        let response = await model.findOne(query);
        if(response){
            response.loginVerificationToken.push(addToTokens);
            response.userLog.push(loginLog);
            response.userName=request.userName;
            response.save();
            result = utils.wasSuccess({});
        }else{
            result = await model.save(request);
        }
        return utils.createResponseObj(result, "InCorrectAction", "LoginTokenCreated");
    };

    module.exports.deleteLoginToken = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        let result = {};
        let query = { userId : request.userId, "loginVerificationToken.token": request.loginVerificationToken };
        let response = await model.findOne(query);

        if(response){
            let tokens = response.loginVerificationToken;
            response.loginVerificationToken = checkTokenArray(tokens, request, utils);
            response.save();
            result = utils.wasSuccess({});
        }else{
            result = utils.wasFailure({});
        }
        return utils.createResponseObj(result, "LoginTokenFailed", "LogoutSuccess");
    };
})();
