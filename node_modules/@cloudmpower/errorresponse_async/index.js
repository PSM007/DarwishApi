(function(){

    module.exports = function(config){
        var messageObj = {};
        var errorResponseEngine;
        try{
            errorResponseEngine = require("../../../nodedb/templates/errorMessages/"+ config.serviceTo + "/"+ config.setLang +"/errorResponse");
        }catch(err){
            errorResponseEngine = require("../../../nodedb/templates/errorMessages/errorResponse");
        }
        if(typeof errorResponseEngine != "function"){
            messageObj = {};
        }else{
            messageObj = errorResponseEngine(config);
        }
        return messageObj;
    };
})();