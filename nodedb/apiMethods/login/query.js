(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let moment = require("moment");

    let methodName = getMethod.FileName;

    let modelName = "User";

    let totalUser="";

    let updateAtLogin = (result, queryObj) => {
        let utils = queryObj.utils;
        let response = {};

        if(!result.isActive){
            response = utils.wasFailure({}, "LoginDeActivatedFailed");
        }else{
            let token = utils.getToken();
            response = utils.wasSuccess({
                "userId"            : result.userId,
                "userName"          : result.userName,
                "isFirstLogin"      : result.isFirstLogin,
                "streak"            : result.streak,
                "updatedOn"         :result.updatedOn,
                "createdOn"         :result.createdOn,
                "userData"          : result.userData,
                "totalUser"         :totalUser,
                "loginToken"        : token
            }, "LoginSuccess");

            let loginTokenCommand = getMethod(methodName.loginTokenCommand);
            queryObj.body = { "userId": result.userId, "loginToken": token ,"userName":result.userName};
            loginTokenCommand.createLoginToken(queryObj);
            result.isFirstLogin = false;
            result.save();
        }

   

        return response;
    };

    let streakCount = (result,queryObj) => {
        let utils = queryObj.utils;
        let response = {};
        var streak =result.streak;
        streak=parseInt(streak);
        let currentDay = utils.getUTCTime();
        let updatedOn = utils.getUTCTime(result.updatedOn);
        let diff = utils.getUTCDateDiff(updatedOn,currentDay); 

        if(diff == 0){
           response = result; 
        }else{
            if(diff == 1){
                result.streak=++streak;
                response=result;
            }else{
                result.streak=0;
                response=result;
            }
            
        }

        return response;
    };

    module.exports.validateLogin = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;
        let dt = moment().format("DD/MM/YYYY HH:MM:SS");

        let result = {};
        let output = {};
        let query = {
            //"serviceId"     : queryObj.serviceFrom,
            "userName"      : (request.userName).replace(/[\u200B-\u200D\uFEFF]/gi , ""),
            "password"      : (request.password).replace(/[\u200B-\u200D\uFEFF]/gi , "")
        };
        let response = await model.findOne(query);
        let count = await model.find({"isActive" : true});
        totalUser = count.length;
        if(response){
            if(response.isActive){
            output =  await streakCount(response,queryObj);
            }else{
                let query2 = {
                    "serviceId"     : queryObj.serviceFrom,
                    "userName"      : (request.userName).replace(/[\u200B-\u200D\uFEFF]/gi , "")
    
                };
                let response2 = await model.findOne(query2);
                if(response2){
                let model1 = getMethod(methodName.dbAbstrator)("LoginToken");
                let query1 = {"userId":response2.userId};
                let res = await model1.findOne(query1);
                let addToTokens = { "token": "", "validity": utils.getUTCEndTime() };
                query1.loginVerificationToken = [addToTokens];
                let loginLog = { "userLoginStatus": "Fail", "userLoginDate": dt };
                query1.userLog = [loginLog];
                query1.userName = request.userName;
                if(res){
                    res.userLog.push(loginLog);
                    res.userName=request.userName;
                    res.save();
                }else{
                    result1 = await model1.save(query1);
                }
            }
            }
            
            result = await updateAtLogin(response, queryObj);
            
        }else{
            let query2 = {
                "serviceId"     : queryObj.serviceFrom,
                "userName"      : (request.userName).replace(/[\u200B-\u200D\uFEFF]/gi , "")

            };
            let response2 = await model.findOne(query2);
            if(response2){
            let model1 = getMethod(methodName.dbAbstrator)("LoginToken");
            let query1 = {"userId":response2.userId};
            let res = await model1.findOne(query1);
            let addToTokens = { "token": "", "validity": utils.getUTCEndTime() };
            query1.loginVerificationToken = [addToTokens];
            let loginLog = { "userLoginStatus": "Fail", "userLoginDate": dt };
            query1.userLog = [loginLog];
            query1.userName = request.userName;
            if(res){
                res.userLog.push(loginLog);
                res.userName = request.userName;
                res.save();
            }else{
                result1 = await model1.save(query1);
            }
        }

            result = utils.wasFailure({}, "LoginFailed");
        }

        return utils.createResponseObj(result);
    };

    module.exports.listAllUser = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;

        //request.serviceId = queryObj.serviceFrom;
        let response = await model.find(request);
        return utils.createResponseObj(response, "InCorrectAction", "SignUpCustomers");
    };

    module.exports.listAllUserPattern = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;

        let expression = new RegExp(request.searchParam , 'g');
        let query = { serviceId : queryObj.serviceFrom, userName: { $regex :  expression  }};
        if(typeof request.isFirstLogin == "boolean") query["isFirstLogin"] = request.isFirstLogin;

        let response = await model.find(query);
        return utils.createResponseObj(response, "InCorrectAction", "SignUpCustomers");
    };

    module.exports.findUserData = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;

      //  request.serviceId = queryObj.serviceFrom;
        let response = await model.findOne(request);
        return utils.createResponseObj(response, "InCorrectAction", "UserFound");
    };
})();