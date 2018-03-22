(function(){

    let getMethod = require('../../config/getGlobalMethod');

    let moment = require("moment");

    let methodName = getMethod.FileName;

    let modelName = "QuoteRequest";

    let modelName1 = "ItemMaster";

    let modelName2 = "User";
    
    let nodemailer = require('nodemailer');

    let where = require('node-where');

    var NodeGeocoder = require('node-geocoder');

   // var smtpTransport = require('nodemailer-smtp-transport');

    
 

    module.exports.insertItem = async (queryObj) => {

        let request = queryObj.body;
        let config = queryObj.config;
        let model = getMethod(methodName.dbAbstrator)(modelName);
        let utils = queryObj.utils;
        //let dt = moment().format("DD/MM/YYYY HH:MM:SS");
        var token = utils.getToken().substr(0,5);
        var requestId = "SR"+token;
       // var requestId="SR"+Math.floor(1000 + Math.random() * 9000);
        var gTotal=0;
        for(var i=0;i<request.itemList.length;i++){
            gTotal = gTotal+(request.itemList[i].quoteQuantity*request.itemList[i].quotePrice);
        }

        var options = {
            provider: 'google',
          
            // Optional depending on the providers
            httpAdapter: 'https', // Default
            apiKey: 'AIzaSyDUBBosBqIbQl-YbHGMDV64G1kU_e3o6Uo', // for Mapquest, OpenCage, Google Premier
            formatter: null         // 'gpx', 'string', ...
          };
          
          var geocoder = NodeGeocoder(options);

          var city = "";

          var flag=false;
          
        

         await geocoder.reverse({lat:request.locLat, lon:request.locLong})
          .then(function(res) {
            console.log(JSON.stringify(res));
            city = res[0].city+","+res[0].zipcode;
           // flag=true;
          })
          .catch(function(err) {
            console.log(err);
          });
        
    
        let result = {};
        let output = {};
        let query = { 
           "requestId" : requestId, 
            "location" :city, 
            "userId" : request.userId, 
            "requestedDate" : new Date(), 
            "updatedOn" : new Date(), 
            "status" : "requested", 
            "itemList" :request.itemList,
            "total" :gTotal
        };
        let response = await model.save(query);
   
        if(response){
          
          for(var i=0;i<request.itemList.length;i++){
            var itemToBeSub = request.itemList[i].quoteQuantity;
            var itemcode = request.itemList[i].itemCode;
            var model1 = getMethod(methodName.dbAbstrator)(modelName1);
            var query1 ={"itemCode":itemcode};
            var res = await model1.findOne(query1);
            if(res){
                res.quantityAvailable =res.quantityAvailable - itemToBeSub;
                res.save(); 
            }
        }

             result = utils.wasSuccess(response, "ListInsertSuccess");

            var model2 = getMethod(methodName.dbAbstrator)(modelName2);
            var query2 ={"userId":request.userId};
            var res1 = await model2.findOne(query2);
            var toEmailId = res1.emailId;



            //Mail Send
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                 user: config.emaicredentials.emailIDFrom,
                 pass: config.emaicredentials.emailIDFrompass
              }
            });
            
            var mailOptions = {
              from: config.emaicredentials.emailIDFrom,
              to: toEmailId,
              subject: 'Sending Email using Node.js',
              text: 'Hi '+res1.userName+',\nThis is system Generated Email\n Regards,\n Darwish'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            }); 


           
          

            // where.is('120.63.248.92', function(err, result) {
            //     if (result) {
            //       console.log('City: ' + result.get('city'));
            //       console.log('State / Region: ' + result.get('region'));
            //       console.log('State / Region Code: ' + result.get('regionCode'));
            //       console.log('Zip: ' + result.get('postalCode'));
            //       console.log('Country: ' + result.get('country'));
            //       console.log('Country Code: ' + result.get('countryCode'));
            //       console.log('Lat: ' + result.get('lat'));
            //       console.log('Lng: ' + result.get('lng'));
            //     }
            //   });
            
            // var transporter = nodemailer.createTransport(smtpTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     auth: {
            //       user: 'psm007994@gmail.com',
            //       pass: 'Prathamesh1994'
            //     }
            //   }));
              
            //   var mailOptions = {
            //     from: 'psm007994@gmail.com',
            //     to: 'friendsgmailacc@gmail.com',
            //     subject: 'Sending Email using Node.js[nodemailer]',
            //     text: 'That was easy!'
            //   };
              
            //   transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //     }
            //   });  




        }else{
        

            result = utils.wasFailure({}, "ListInsertFailed");
        }

        return utils.createResponseObj(result);
    };

    module.exports.listAllItems = async (queryObj) => {
        
                let request = queryObj.body;
                let model = getMethod(methodName.dbAbstrator)(modelName);
                let utils = queryObj.utils;
                //let dt = moment().format("DD/MM/YYYY HH:MM:SS");
                var requestId = "req"+utils.getToken();
                let result = {};
                let output = {};
                let query = {  "userId" : request.userId };
                let response = await model.find(query);
              
                if(response){
                  
                  //  result = response;
                    result = utils.wasSuccess(response, "ListAllSuccess");
                }else{
                
        
                    result = utils.wasFailure({}, "ListAllFailed");
                }
        
                return utils.createResponseObj(result);
            };

   
})();