(function () {

    let timestamps = require("@cloudmpower/utility_async").timestamp;

    module.exports = function(db){

        let mongoose = db.mongoose;

        let Schema = mongoose.Schema;

        let User = new Schema({ 
            userId : {type: String , required: true }, 
            password : {type: String , required: true }, 
            userName : {type: String , required: true }, 
            lastLogin : {type: Date , required: true }, 
            userActive : {type: Boolean , required: true }, 
            createdBy : {type: String , required: true },
            emailId : {type: String , required: true },
            createdOn : {type: Date , required: true }, 
            updatedBy : {type: String , required: true }, 
            updatedOn : {type: String , required: true }
        });

        User.plugin(timestamps);
        User.index( { emailId: 1, userId: 1 }, { unique: true } );
        module.exports.User = mongoose.model('user', User);

        
        let ItemMaster = new Schema({ 
            itemCode : {type: String , required: true }, 
            itemName : {type: String , required: true }, 
            quantityAvailable : {type: String , required: true }, 
            unitPrice : {type: String , required: true }, 
            createdBy : {type: String , required: true }, 
            createdOn : {type: Date , required: true },
            updatedBy : {type: String , required: true }, 
            updatedOn : {type: Date , required: true },
        });

        ItemMaster.plugin(timestamps);
        ItemMaster.index( { itemCode: 1, itemName: 1 }, { unique: true } );
        module.exports.ItemMaster = mongoose.model('itemmaster', ItemMaster);



        let QuoteRequest = new Schema({ 
            requestId : {type: String , required: true }, 
            location :{type: String , required: true }, 
            userId : {type: String , required: true }, 
            requestedDate : {type: Date , required: true }, 
            updatedOn :{type: Date , required: true },
            status : {type: String , required: true },
            total : {type: String , required: true }, 
            itemList : [
                {
                    itemCode : {type: String , required: true },
                    itemName : {type: String , required: true },
                    quoteQuantity : {type: String , required: true }, 
                    quotePrice : {type: String , required: true },
                }
            ]
        });

        QuoteRequest.plugin(timestamps);
        QuoteRequest.index( { requestId: 1 }, { unique: true } );
        module.exports.QuoteRequest = mongoose.model('quoterequest', QuoteRequest);
        // let LoginReports = new Schema({
        //     userId                  : {type: String , required: true },
        //     userLog  : []
        // });
        // LoginReports.plugin(timestamps);
       
        // module.exports.LoginReports = mongoose.model('loginreport', LoginReports);
    }
})();