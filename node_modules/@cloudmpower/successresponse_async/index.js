(function(){

    module.exports = function(config){
        var messageObj = {};
        var successResponseEngine;
        try{
            successResponseEngine = require("../../../nodedb/templates/successMessages/"+ config.serviceTo + "/"+ config.setLang +"/successResponse");
        }catch(err){
            successResponseEngine = require("../../../nodedb/templates/successMessages/successResponse");
        }
        if(typeof successResponseEngine != "function"){
            messageObj = {};
        }else{
            messageObj = successResponseEngine(config);
        }
        return messageObj;
    };
})();