(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let methodName = getMethod.FileName;

    let modelName = "Login";

    module.exports.createUser = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        request.serviceId = commandObj.serviceFrom;
        request.userId = utils.getToken();

        if(!request.password) request.password = utils.getToken();
        let response = await model.save(request);


        // let model1 = getMethod(methodName.dbAbstrator)("loginreport");
        // let loginLog = { "userLoginStatus": "Fail", "userLoginDate": utils.getUTCEndTime() };
        // let query = { "userId": request.userId,"userLog":[loginLog] };
        // let res = await model1.save(query);
       



        return utils.createResponseObj(response, "SignUpFailed", "LoginCreation");
    };

    module.exports.userDataUpdate = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        let query = { "serviceId": commandObj.serviceFrom, "userId": request.userId };
        let response = await model.update(query, request);
        return utils.createResponseObj(response, "InCorrectAction", "ProfileUpdate");
    };

    module.exports.userLogout = async (commandObj) => {
        let loginTokenCommand = getMethod(methodName.loginTokenCommand);
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        let response = await loginTokenCommand.deleteLoginToken(commandObj);
        return utils.createResponseObj(response, "LoginTokenFailed", "LogoutSuccess");
    };

    module.exports.activateLogin = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        request.isActive = true;
        let query = { "serviceId": commandObj.serviceFrom, "userId": request.userId};
        let response = await model.update(query, request);
        return utils.createResponseObj(response, "InCorrectAction", "LoginActive");
    };

    module.exports.deActivateLogin = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        request.isActive = false;
        let query = { "serviceId": commandObj.serviceFrom, "userId": request.userId};
        let response = await model.update(query, request);
        return utils.createResponseObj(response, "InCorrectAction", "LoginDeActive");
    };

    module.exports.deleteUser = async (commandObj) => {
        let request = commandObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = commandObj.utils;

        //request.isActive = false;
        let query = {  "userId": request.userId};
        let response = await model.delete(query, request);
        return utils.createResponseObj(response, "InCorrectAction", "UserDelete");
    };
})();