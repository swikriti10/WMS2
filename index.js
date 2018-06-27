"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var http = require('http');
var request = require('request');
var session = require('express-session');
var csrfToken;


var c;


const restService = express();

const App = require('actions-on-google').DialogflowApp;
var slack_message;


var url = "http://208.85.249.174:8000/sap/opu/odata/CRVWM/WMS_SRV/";
var url1 = "http://208.85.249.174:8000/sap/opu/odata/sap/ZWMS_BOT_SRV/";

//var d = '1140';
var i = 0;
var obj = [];
var botResponse = "";
restService.use(
  bodyParser.urlencoded({
      extended: true
  })
);

restService.use(bodyParser.json());
//restService.use(session({ secret: 'ssshhhhh' }));
//var sess;


restService.post("/wms", function (req, res) {
    var selectedmenu =
     req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.selectedmenu
        ? req.body.result.parameters.selectedmenu
       : "notselectedmenu";

    var selectedsubmenu =
       req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.selectedsubmenu
          ? req.body.result.parameters.selectedsubmenu
         : "notselectedsubmenu";


    var val =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.echoText
        ? req.body.result.parameters.echoText
        : "notstart";


    const app = new App({ request: req, response: res });
    var url = "http://208.85.249.174:8000/sap/opu/odata/CRVWM/WMS_SRV/";
    //sess = req.session;
    var i = 0;
    var obj = [];
    var botResponse = "";
    var c;

    //sess = req.session;


    if (val == "start" || val == "Start") {

        //   sess.name ="Napo";
        request({
            
            url: url + "GetTileInfoSet?$filter=AppId%20eq%20%27WMS%27&sap-client=900&sap-language=EN&$format=json",
           // url: url + "GetTilesSet?$filter=BotCode eq 'start'&sap-client=900&sap-language=EN&$format=json",
            // url: url + "GetMenuSet?$filter=TileIdBot eq 'INBOUND' &sap-client=900&sap-language=EN&$format=json",


            //url: url + "ListOpenTOSet?$filter=UserId eq 'SAPUSER' and TorderFrom eq '' and TorderTo eq '' and DelvFrom eq '' and DelvTo eq'' and SoFrom eq '' and SoTo eq '' and Material eq '' &sap-client=900&sap-language=EN&$format=json",
            headers: {
                //"Authorization": "Basic <<base64 encoded SAPUSER:crave123>>",
                "Authorization": "Basic c2FwdXNlcjpjcmF2ZTEyMw==",
                "Content-Type": "application/json",
                "x-csrf-token": "Fetch"
            }

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                csrfToken = response.headers['x-csrf-token'];
                // console.log(csrfToken);
                // var gwResponse = body.asString();
                // var JSONObj = JSON.parse(body);
                var c = JSON.parse(body)
                //var a = res.json(body);
                var len = c.d.results.length;
                //var a = JSON.stringify(a);


                var obj = [];
                var i = 0;
                if (c.d.results.length > 0) {
                    botResponse = "Choose from following menu- ";

                    for (; i < c.d.results.length; i++) {
                        botResponse += " \n";
                        botResponse += c.d.results[i].TileName;
                        // botResponse+= c.d.results[i].MenuName;


                    }

                }
                else {
                    botResponse = "No Menu Items";
                }

                console.log(botResponse);

            }


            return res.json({
                speech: botResponse,
                displayText: botResponse,

                source: "webhook-echo-sample",


            });


        });


    }


    else if (selectedmenu == "INBOUND" && val == "notstart") {
        request({
            url: url + "GetMenuSet?$filter=TileIdBot eq 'INBOUND' &sap-client=900&sap-language=EN&$format=json",


            //url: url + "ListOpenTOSet?$filter=UserId eq 'SAPUSER' and TorderFrom eq '' and TorderTo eq '' and DelvFrom eq '' and DelvTo eq'' and SoFrom eq '' and SoTo eq '' and Material eq '' &sap-client=900&sap-language=EN&$format=json",
            headers: {
                //"Authorization": "Basic <<base64 encoded SAPUSER:crave123>>",
                "Authorization": "Basic c2FwdXNlcjpjcmF2ZTEyMw==",
                "Content-Type": "application/json",
                "x-csrf-token": "Fetch"
            }

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                csrfToken = response.headers['x-csrf-token'];
                // console.log(csrfToken);
                // var gwResponse = body.asString();
                // var JSONObj = JSON.parse(body);
                var c1 = JSON.parse(body)
                //var a = res.json(body);
                var len1 = c1.d.results.length;
                //var a = JSON.stringify(a);
                var botResponse1 = "";

                var obj = [];
                var i = 0;
                if (c1.d.results.length > 0) {
                    botResponse1 = "Choose following options for " + selectedmenu + "- ";

                    for (; i < c1.d.results.length; i++) {
                        botResponse1 += " \n";
                        botResponse1 += c1.d.results[i].MenuName;

                    }

                }
                else {
                    botResponse1 = "No Menu Items";
                }

                //console.log(botResponse);

                return res.json({
                    speech: botResponse1,
                    displayText: botResponse1,

                    source: "webhook-echo-sample",


                });


            }

        });

    }
    else if (selectedsubmenu != "notselectedsubmenu" && val == "notstart" && selectedmenu == "notselectedmenu") {
        request({
            url: url + "GetSubMenuSet?$filter=MenuName eq 'GOODS RECEIPT' &sap-client=900&sap-language=EN&$format=json",


            //url: url + "ListOpenTOSet?$filter=UserId eq 'SAPUSER' and TorderFrom eq '' and TorderTo eq '' and DelvFrom eq '' and DelvTo eq'' and SoFrom eq '' and SoTo eq '' and Material eq '' &sap-client=900&sap-language=EN&$format=json",
            headers: {
                //"Authorization": "Basic <<base64 encoded SAPUSER:crave123>>",
                "Authorization": "Basic c2FwdXNlcjpjcmF2ZTEyMw==",
                "Content-Type": "application/json",
                "x-csrf-token": "Fetch"
            }

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                csrfToken = response.headers['x-csrf-token'];
                // console.log(csrfToken);
                // var gwResponse = body.asString();
                // var JSONObj = JSON.parse(body);
                var c1 = JSON.parse(body)
                //var a = res.json(body);
                var len1 = c1.d.results.length;
                //var a = JSON.stringify(a);
                var botResponse1 = "";

                var obj = [];
                var i = 0;
                if (c1.d.results.length > 0) {
                    botResponse1 = "Choose following options for GR - ";

                    for (; i < c1.d.results.length; i++) {
                        botResponse1 += " \n";
                        botResponse1 += c1.d.results[i].Submenu;

                    }

                }
                else {
                    botResponse1 = "No Menu Items";
                }

                //console.log(botResponse);

                return res.json({
                    speech: botResponse1,
                    displayText: botResponse1,

                    source: "webhook-echo-sample",


                });


            }

        });

    }
    else {
        return res.json({
            speech: selectedmenu,
            displayText: selectedmenu,

            source: "webhook-echo-sample",


        });
    }



});











restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});
