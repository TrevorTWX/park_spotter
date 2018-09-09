var express = require("express");
var router = express.Router();
var request = require("request");

var db = require("../models");
var gate;
var gatePlaned;

router.post("/entrances",function(req,res){
    console.log(req.body);
    request("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+req.body.origin+"&destinations=33.7880,-84.3207&departure_time=now&key=AIzaSyAKXqkSF_vdJRePOHSiM6gF3AF8TLG5biw", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var duration = JSON.parse(body).rows[0].elements[0].duration_in_traffic.value;
          console.log(duration);
          var d = new Date();
          var arrival_time_hour=d.getHours();
          var arrival_time_min=d.getMinutes()+Math.floor(duration/60);
          console.log(arrival_time_hour+ " "+arrival_time_min);
          if(arrival_time_min>=60){
            arrival_time_hour++;
            arrival_time_min-60;
        }
          var arrival_time=arrival_time_hour+":"+arrival_time_min;
          console.log(arrival_time);
          var idNum;
          if(arrival_time_hour!=8){
            idNum=13; 
        } else{
            idNum=Math.floor(arrival_time_min/5)+1;
        }

        var durationText = JSON.parse(body).rows[0].elements[0].duration_in_traffic.text;
        var distanceText = JSON.parse(body).rows[0].elements[0].distance.text;

        db.TimeEntrance.findAll({
            where: {
              id: idNum
            }
          }).then(function(data){
            var A = data[0].dataValues.A;
            var B = data[0].dataValues.B;
            var C = data[0].dataValues.C;
            var GatesCarNum =[A,B,C];
            gate = "A";
            gatePlaned = GatesCarNum[0];
            if(GatesCarNum[1]<gatePlaned){
                gate = "B";
                gatePlaned = GatesCarNum[1]
            };
            if(GatesCarNum[2]<gatePlaned){
                gate = "C";
                gatePlaned = GatesCarNum[2]
            };
            
            var update ={
                [gate]: gatePlaned+1
            }
            console.log(update);
            return update;
          }).then(function(update){
            console.log(update);
            db.TimeEntrance.update(update,{
                where:{
               id : idNum
             }
            }).then(function(){
               console.log(gate);
               res.json({
                   entrance: gate,
                   duration: durationText,
                   distance: distanceText
            });
            });

            
          
        });
    
  }});
});
  


router.post("/", function(req,res){
   

});








module.exports = router;