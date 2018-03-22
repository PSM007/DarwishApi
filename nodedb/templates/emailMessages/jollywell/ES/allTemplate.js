(function(){

    var moment = require("moment");

    function EmailTemplate (config , tnxId){
        this.config = config;
        this.tnxId = tnxId;
    }

    EmailTemplate.prototype = {
        generic : function(){
            return "<p>Dear Customer,</p><p>Wishing you the best.</p>";
        },
        welcomeEmailWithLink: function(data){
            return "<p>Hi "+ data.userData.firstName +", </p>"+
                    "<p>Jollywell is a fun-filled journey to getting better at what you do - selling."+
                    "<p>As a user of Jollywell, you will enhance your product knowledge, selling skills and mental agility with scientifically based games and activities. All this on your mobile device.</p>"+
                    "<p>You can play these serious games anytime – while waiting in the clinic, at home, while travelling – it takes only 3 minutes.</p>"+
                    "<p>We provide a new set of games each week to help you get the most out of your Jollywell fun-learning experience.</p>"+
                    "<p>Please verify your emailId to access this service. You will be prompted to set the password at verification. Please click <a href=\""+ data.verificaitonLink +"\">here</a> to complete the verification process.</p>"+
                    "<br>"+
                    "<p>Let’s create ripples.</p>"+
                    "<p>The Jollywell Team</p>";
        },
        forgotPasswordChange: function(data){
            return "<p>Hi "+ data.firstName +",</p>" +
                "<p>As requested by you we have changed your password. ​</p>"+
                "<p>Password: "+ data.password +"</p>"+
                "<p>You will be prompted to change ​the temporary ​password at login.</p>"+
                "<br/>" +
                "<p>Thank you,</p>"+
                "<p>The Jollywell Team</p>";
        },
        welcomeEmailWithPassword: function(data){
            /*return "<p>Hi "+ data.name +", </p>"+
                "<p>As a user of Jollywell, You are welcome</p>"+
                "<p>To login please click <a href=""+ this.config.baseUrl +"">Here</a> </p>"+
                "<p>UserName: "+ data.userName +"</p>"+
                "<p>Password: "+ data.password +"</p>"+
                "<p>Your login credentials are provided to you with a temporary password. You will be prompted to change password at login.</p>"+
                "<br>"+
                "<p>Let’s create ripples.</p>"+
                "<p>The Jollywell Team</p>";*/

            return "<div>"+
                "<p><img style=\"width: 50px\" src=\"cid:jollywellAppLogo\"/></p>" +
                "<p><b>Welcome to the jollywell world.</b></p>"+
                "<br>"+
                "<p>Gini, your personal health coach, is eagerly waiting to take you on a fun-filled journey to a healthier, happier you.</p>"+
                "<br>"+
                "<p>How it works</p>"+
                "<p>1. Pick a daily task to get to your health goal</p>"+
                "<p>2. Make the right choices, coached by Gini</p>"+
                "<p>3. Report and monitor your daily progress</p>"+
                "<p>4. Make it a habit</p>"+
                "<br>"+
                "<p>Get going on the desktop. To login please click <a href=\""+ this.config.clientUrl +"\">Here</a></p>"+
                "<p>UserName: "+ data.userName +"</p>"+
                "<p>Password: "+ data.password +"</p>"+
                "<br>"+
                "<p>Download app on an Android device</p>"+
                "<p><a href=\""+ this.config.androidAppLink +"\">"+ this.config.androidAppLink +"</a></p>"+
                "<br>"+
                "<p>Help is just a click away. If you face any problem, drop us a line on care@jollywell.in. We will take it from there.</p>"+
                "<br>"+
                "<p>Coming soon! The jollywell iOS app</p>"+
                "<br>"+
                "<br>"+
                "<p style=\"font-size: 13px\">© 2016 Pepper Wellness Private Limited. All rights reserved. Pepper Wellness Private Limited. 337-338, 3rd floor, Avior, Nirmal Galaxy, LBS Road, Mulund West, Mumbai 400080.</p>"+
                "</div>";
        },
        emailForNotSignedUser: function(data){

            return "<p>Hi "+ data.name +",</p>"+
                "<p>I realize, you have not signed into Jollywell yet. Please sign up soon. It is going to be a fun journey towards a healthier you.</p>"+
                "<p>Whether you want to Lose Weight, Feel Young, Be Happy or Be Fit, I will guide you to your goal and root for you throughout the journey.</p>"+
                "<p>Please <a href=\""+ this.config.clientUrl +"\">sign up</a> soon.</p>"+
                "<br>"+
                "<p>Gini</p>"+
                "<p>Your personal health coach</p>";
        },
        emailForNotSelectedHabit: function(data){

            return "<p>Hi "+ data.name +",</p>"+
                "<p>Thank you for signing in to Jollywell.</p>"+
                "<p>I realize, you have not selected a habit yet. Get going soon. It is going to be a fun journey towards a healthier you.</p>"+
                "<p>Whether you want to Lose Weight, Feel Young, Be Happy or Be Fit, I will guide you to your goal and root for you throughout the journey.</p>"+
                "<p>See you soon</p>"+
                "<br>"+
                "<p>Gini</p>"+
                "<p>Your personal health coach</p>";
        },
        newChallengePublished: function(data){
            return "<p>Hi "+ data.name +",</p>" +
                "<p>A new challenge worth "+ data.scoreOutOf +" points has been assigned to you today. It expires on "+ moment(data.challengeEndDate).format("MM/DD/YYYY") +" .</p>"+
                "<br>"+
                "<p>Let’s create ripples.</p>"+
                "<br>"+
                "<p>The Jollywell Team</p>"+
                "<p>Jollywell is a fun-filled journey to getting better at what you do - selling.</p>";
        },
        challengeDelayedAlert: function(data){
            return "<p>Hi "+ data.name +",</p>" +
                "<p>A challenge worth "+ data.scoreOutOf +" points is set to expire tomorrow. Ensure you take the challenge today itself.</p>"+
                "<br>"+
                "<p>Let’s create ripples.</p>"+
                "<br>"+
                "<p>The Jollywell Team</p>"+
                "<p>Jollywell is a fun-filled journey to getting better at what you do - selling.</p>";
        },
        buddyNotificationAtSetup: function(data){
            return "<p>Hi "+ data.buddyName +",</p>"+
                "<p>You will be happy to know that "+ data.userFirstName +
                " has requested you to be a health buddy on the journey to "+
                data.goalName +". You will play a crucial role in helping "+
                data.userFirstName +" get healthier. "+
                data.userFirstName +" has decided to start his journey by building a new habit - "+ data.habitName +
                ". Gini, the health coach, will send you periodic updates about "+
                data.userFirstName +"’s progress. It is a matter of great pride, "+ data.buddyName +", that "+
                data.userFirstName +" looks up to you as a health buddy. You can keep "+
                data.userFirstName +" motivated in you own unique way,or ensure "+
                data.userFirstName +" doesn’t go off course.</p>"+
                "<br>"+
                "<p>With warm regards</p>"+
                "<p>Gini</p>"+
                "<p><img style=\"width: 50px\" src=\"cid:jollywellAppLogo\"/></p>";
        }
    };

    module.exports = function(config , tnxId){
        return (new EmailTemplate(config , tnxId));
    };
})();