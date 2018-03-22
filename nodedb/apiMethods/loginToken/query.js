(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let methodName = getMethod.FileName;

    let modelName = "LoginToken";

    module.exports.verifyLoginToken = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;

        let query = { "userId": request.userId, "loginVerificationToken" : { "$elemMatch": { "token": request.loginVerificationToken } } };
        let response = await model.findOne(query);
        return utils.createResponseObj(response, "LoginTokenFailed", "LoginTokenVerified");
    };


    
    module.exports.userReportList = async (queryObj) => {
        
                let request = queryObj.body;
                let model = getMethod(methodName.dbAbstrator)(modelName);
                let utils = queryObj.utils;
        
                let query = { };
                let response = await model.find(query);
                return utils.createResponseObj(response, "LoginTokenFailed", "LoginTokenVerified");
            };
            
            module.exports.userReportListDetail = async (queryObj) => {
                
                        let request = queryObj.body;
                        let model = getMethod(methodName.dbAbstrator)(modelName);
                        let utils = queryObj.utils;
                
                        let query = {"userId":request.userId };
                        let response = await model.find(query);
                        let res =response[0].userLog;
                        return utils.createResponseObj(res, "LoginTokenFailed", "LoginTokenVerified");
                    };
})();