(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let moment = require("moment");

    let methodName = getMethod.FileName;

    let modelName = "ItemMaster";

    let totalUser="";


 

    module.exports.listItem = async (queryObj) => {

        let request = queryObj.body;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;
        //let dt = moment().format("DD/MM/YYYY HH:MM:SS");

        let result = {};
        let output = {};
        let query = {};
        let response = await model.find(query);
      
        if(response){
          
          //  result = response;
            result = utils.wasSuccess(response, "ListSuccess");
        }else{
        

            result = utils.wasFailure({}, "ListFailed");
        }

        return utils.createResponseObj(result);
    };

   
})();