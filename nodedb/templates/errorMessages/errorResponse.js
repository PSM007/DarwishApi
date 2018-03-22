(function(){

    module.exports = function(){
        return {
            "InCorrectAction"                   : "This action is not authorised",
            "SignUpFailed"                      : "User already Registered. Registration Failed",
            "IncorrectUserIdFailed"             : "Activation/De-Activation Failed. Incorrect Input",
            "IsEmailVerifiedFailed"             : "Email has not been verified",
            "LoginTokenFailed"                  : "Token verification Failed",
            "LoginFailed"                       : "Incorrect UserName/Password. You are not Authorized",
            "LoginDeActivatedFailed"            : "Please verify your account to activate.",
            "IncorrectServiceFailed"            : "Incorrect Service. This not a registered valid service",
            "OperationFailed"                   : "Generic Error",
            "SessionTimeoutError"               : "Session has Expired. Please login again",
            "InCorrectRetryError"               : "Account Locked. Due to multiple incorrect Login attempts ,your account is now locked. Please contact helpline",
            "ListFailed"                    :'Item List Not Found',
            "ListInsertSuccess"             :'Items Insert failed',
            "ListAllFailed"                 :'Record Not found'
        }
    };
})();