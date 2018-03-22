(function () {
    <!--##################################Require the Modules########################################################-->

    let timestamps = require("@cloudmpower/utility_async").timestamp;

    module.exports = function(db){

        let mongoose = db.mongoose;

        let Schema = mongoose.Schema;

        <!--##################################Login Schema###########################################################-->
        <!--#########################################################################################################-->
        let Login = new Schema({
            serviceId               : {type: String , required: true },
            userId                  : {type: String , required: true },
            userName                : {type: String , required: true },
            password                : {type: String , default: 'P' },
            isFirstLogin            : {type: Boolean, default: true },
            isActive                : {type: Boolean, default: false },
            streak                  : {type: String, default: '0' },
            updatedOn               : {type: Date,  required: true  },
            createdOn               : {type: Date,  required: true  },
            userData                : {}
        });

        Login.plugin(timestamps);
        Login.index( { userName: 1, serviceId: 1 }, { unique: true } );
        module.exports.Login = mongoose.model('login', Login);

        <!--##################################LoginToken Schema#####################################################-->
        <!--#########################################################################################################-->
        let LoginToken = new Schema({
            userId                  : {type: String , required: true },
            loginVerificationToken  : [],
            userLog                 :[],
            userName                 :{type: String , required: true },
        });

        LoginToken.plugin(timestamps);
        module.exports.LoginToken = mongoose.model('logintoken', LoginToken);



        // let LoginReports = new Schema({
        //     userId                  : {type: String , required: true },
        //     userLog  : []
        // });
        // LoginReports.plugin(timestamps);
       
        // module.exports.LoginReports = mongoose.model('loginreport', LoginReports);
    }
})();