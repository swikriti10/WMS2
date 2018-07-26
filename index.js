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


var url ="http://208.85.249.174:8000/sap/opu/odata/CRVWM/WMS_SRV/";
var url1 ="http://208.85.249.174:8000/sap/opu/odata/sap/ZWMS_BOT_SRV/";

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

    var Ctilename =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.tilename
        ? req.body.result.parameters.tilename
        : "Cnotselectedmenu";


    var actionName =
    req.body.result &&
    req.body.result.action
      ? req.body.result.action
      : "wrong";


    var Ponumber =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.Ponumber
        ? req.body.result.parameters.Ponumber
        : "noPonumber";

    var quantity =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.quantity
        ? req.body.result.parameters.quantity
        : "zeroQuant";

    var cmaterial = req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.cmaterial
        ? req.body.result.parameters.cmaterial
        : "nocmaterial";

    var matno = req.body.result &&
          req.body.result.parameters &&
          req.body.result.parameters.material
            ? req.body.result.parameters.material
            : "nomatno";

    var xy = req.body.result &&
  req.body.result.metadata &&
  req.body.result.metadata.IntentName
    ? req.body.result.metadata.IntentName
    : "noxy";





    const app = new App({ request: req, response: res });
    var url = "http://208.85.249.174:8000/sap/opu/odata/CRVWM/WMS_SRV/";
  var url1 ="http://208.85.249.174:8000/sap/opu/odata/sap/ZWMS_BOT_SRV/";

    //sess = req.session;
    var i = 0;
    var obj = [];
    var botResponse = "";
    var c;

    //sess = req.session;


    if (val == "start" || val == "Start" || actionName == "action_start") {

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
                    botResponse = "Choose following options for menu: ";

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
                // speech: optionIntentname,
                // displayText: optionIntentname,
                source: "webhook-echo-sample",
                contextOut: [{
                    name: "CBack",
                    lifespan: "2",
                    parameters: {

                        key: "val"

                    }
                }]




            });


        });


    }


    else if (selectedmenu != "notselectedmenu" && val == "notstart" && selectedsubmenu == "notselectedsubmenu") {


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

                    for (; i < c.d.results.length; i++) {

                        if (c.d.results[i].TileName == selectedmenu) {
                            var tileid = c.d.results[i].TileId

                            /////////////////Block for submenu//////////////////////////////////
                            request({
                                //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
                                url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27" + tileid + "%27&sap-client=900&sap-language=EN&$format=json",


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
                                        botResponse1 = "Choose following options for " + selectedmenu + ": ";

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
                                        contextOut: [{
                                            name: "CBack",
                                            lifespan: "2",
                                            parameters: {

                                                key: "selectedmenu",
                                                value: selectedmenu

                                            }
                                        }]


                                    });


                                }

                            });


                            ///////////////////////////////////Block for submenu/////////////////////////////////////////////////////////////









                        }
                        // botResponse+= c.d.results[i].MenuName;


                    }

                }


            }




        });











        ///////////////////////////////////Block for submenu/////////////////////////////////////////////////////////////

    }
    else if (selectedsubmenu != "notselectedsubmenu" && val == "notstart") {
        ////// Block to fetch Tile ID then submenu details/////////////////////////////////////////////////////////////////////////

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

                    for (; i < c.d.results.length; i++) {

                        if (c.d.results[i].TileName == Ctilename) {
                            var tileid = c.d.results[i].TileId

                            /////////////////Block for submenu//////////////////////////////////
                            request({
                                //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
                                url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27" + tileid + "%27&sap-client=900&sap-language=EN&$format=json",


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

                                        for (; i < c1.d.results.length; i++) {

                                            if (c1.d.results[i].MenuName == selectedsubmenu) {

                                                ////////////////////////////////////////////////////////start if////////////////////////////////////////////////////////////////////////////////

                                                var submenuid = c1.d.results[i].SubMenuId
                                                request({

                                                    url: url + "GetSubMenuSet?$filter=TileId%20eq%20%27" + tileid + "%27%20and%20SubMenuId%20eq%20%27" + submenuid + "%27&sap-client=900&sap-language=EN&$format=json",


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
                                                        var c2 = JSON.parse(body)
                                                        //var a = res.json(body);
                                                        var len2 = c2.d.results.length;
                                                        //var a = JSON.stringify(a);
                                                        var botResponse1 = "";

                                                        var obj = [];
                                                        var i = 0;
                                                        if (c2.d.results.length > 0) {
                                                            botResponse1 = "Choose following options for " + selectedsubmenu + " : ";

                                                            for (; i < c2.d.results.length; i++) {
                                                                botResponse1 += " \n";

                                                                botResponse1 += c2.d.results[i].SearchType;

                                                            }

                                                        }
                                                        else {
                                                            botResponse1 = "No SubMenu Items";
                                                        }

                                                        //console.log(botResponse);

                                                        return res.json({
                                                            speech: botResponse1,
                                                            displayText: botResponse1,

                                                            source: "webhook-echo-sample",
                                                            contextOut: [{
                                                                name: "CBacksub",
                                                                lifespan: "5",
                                                                parameters: {

                                                                    key: "selectedmenu",
                                                                    value: Ctilename

                                                                }
                                                            }]

                                                        });


                                                    }

                                                });


                                                /////////////////////////////////////////////////////////////////////end if/////////////////////////////////////////////////////////////////////////////////////////////

                                            }

                                        }

                                    }

                                    //console.log(botResponse);
                                }


                            });
                        }
                    }
                }

            }
        });


    }
    else if (actionName == "submenuselected") {
        return res.json({
            speech: "Scan PO Number",
            displayText: "Scan PO Number",

            source: "webhook-echo-sample",


        });
    }


    else if (actionName == "action_back") {

        //var contextname = app.getContext('Cbacksub');
        //  var contextparam = contextname.parameters.key;
        //   var contextvalue = tempContext.parameters.value;

        return res.json({
            speech: "botResponse",
            displayText: "botResponse",
            //    // speech: optionIntentname,
            //    // displayText: optionIntentname,
            source: "webhook-echo-sample",

            followupEvent: {
                name: "get_start",
                data: {
                    echoText: "start"
                }
            }


        });





    }


    else if (actionName == "action_selectedsubmenu") {

        var contextname = app.getContext('cbacksub') ? app.getContext('cbacksub') : "nocontext";
        var contextname1 = app.getContext('CBacksub') ? app.getContext('CBacksub') : "nocontext1";

        ////   var contextparam = tempContext.parameters.key;
        var contextvalue;
        var contextvalue1;
        if (contextname == "nocontext") {
            var contextvalue1 = contextname1.parameters.value;
            var contextvalue = contextvalue1;
        }

        else {
            var contextvalue = contextname.parameters.value;
        }



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

                    for (; i < c.d.results.length; i++) {

                        if (c.d.results[i].TileName == contextvalue) {
                            var tileid = c.d.results[i].TileId

                            /////////////////Block for submenu//////////////////////////////////
                            request({
                                //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
                                url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27" + tileid + "%27&sap-client=900&sap-language=EN&$format=json",


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
                                        botResponse1 = "Choose following options for " + contextvalue + ": ";

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
                                        contextOut: [{
                                            name: "cmenu",
                                            lifespan: "1",
                                            parameters: {

                                                selectedmenu: contextvalue


                                            }

                                        }]


                                    });


                                }

                            });


                            ///////////////////////////////////Block for submenu/////////////////////////////////////////////////////////////









                        }
                        // botResponse+= c.d.results[i].MenuName;


                    }

                }


            }




        });

    }


    else if (actionName == "action_backscanpo") {

        var contextname = app.getContext('cpo');
        var choosesubmenu = contextname.parameters.choosesubmenu;
        var choosetilename = contextname.parameters.choosetilename;
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

                    for (; i < c.d.results.length; i++) {

                        if (c.d.results[i].TileName == choosetilename) {
                            var tileid = c.d.results[i].TileId

                            /////////////////Block for submenu//////////////////////////////////
                            request({
                                //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
                                url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27" + tileid + "%27&sap-client=900&sap-language=EN&$format=json",


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

                                        for (; i < c1.d.results.length; i++) {

                                            if (c1.d.results[i].MenuName == choosesubmenu) {

                                                ////////////////////////////////////////////////////////start if////////////////////////////////////////////////////////////////////////////////

                                                var submenuid = c1.d.results[i].SubMenuId
                                                request({

                                                    url: url + "GetSubMenuSet?$filter=TileId%20eq%20%27" + tileid + "%27%20and%20SubMenuId%20eq%20%27" + submenuid + "%27&sap-client=900&sap-language=EN&$format=json",


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
                                                        var c2 = JSON.parse(body)
                                                        //var a = res.json(body);
                                                        var len2 = c2.d.results.length;
                                                        //var a = JSON.stringify(a);
                                                        var botResponse1 = "";

                                                        var obj = [];
                                                        var i = 0;
                                                        if (c2.d.results.length > 0) {
                                                            botResponse1 = "Choose following options for " + choosesubmenu + " : ";

                                                            for (; i < c2.d.results.length; i++) {
                                                                botResponse1 += " \n";

                                                                botResponse1 += c2.d.results[i].SearchType;

                                                            }

                                                        }
                                                        else {
                                                            botResponse1 = "No SubMenu Items";
                                                        }

                                                        //console.log(botResponse);

                                                        return res.json({
                                                            speech: botResponse1,
                                                            displayText: botResponse1,

                                                            source: "webhook-echo-sample",
                                                            contextOut: [{
                                                                name: "cx",
                                                                lifespan: "1",
                                                                parameters: {

                                                                    selectedsubmenu: choosesubmenu,
                                                                    tilename: choosetilename

                                                                }
                                                            }]

                                                        });


                                                    }

                                                });


                                                /////////////////////////////////////////////////////////////////////end if/////////////////////////////////////////////////////////////////////////////////////////////

                                            }

                                        }

                                    }

                                    //console.log(botResponse);
                                }


                            });
                        }
                    }
                }

            }
        });


    }




    else if (actionName == "actionscanPo" && Ponumber != "noPonumber") {
        var itemcount = "";
        request({

            url: url + "GRSearchSet?$filter=PoNumber%20eq%20%27" + Ponumber + "%27%20and%20Material%20eq%20%27%27%20and%20MovTyp%20eq%20%27101%27%20and%20MatDoc%20eq%20%27%27%20and%20Vendor%20eq%20%27%27%20and%20CreatedFrom%20ge%20datetime%270000-00-00T00:00:00%27%20and%20CreatedTo%20le%20datetime%270000-00-00T00:00:00%27&sap-client=900&sap-language=EN&$format=json",


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
                itemcount = c.d.results[0].ItemNo;
                itemcount = itemcount.slice(1);
                var obj = [];
                var i = 0;
                //if (c.d.results.length > 0) {

                //   for (; i < c.d.results.length; i++) {

                //if (c.d.results[i].TileName == Ctilename) {


                /////////////////Block for submenu//////////////////////////////////
                request({
                    //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
                    url: url + "Get_PoItem_DetailsSet?$filter=PoNumber%20eq%20%27" + Ponumber + "%27%20and%20MoveType%20eq%20%27101%27&sap-client=900&sap-language=EN&$format=json",


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
                            botResponse1 = "PO " + Ponumber + " has " + itemcount + " material -\n";
                            // botResponse += c.d.results[0].Material;

                            for (; i < len1; i++) {
                                botResponse1 += c1.d.results[i].Material + "(" + c1.d.results[i].OpenQuantity + ")";

                                botResponse1 += ",";

                            }
                            botResponse1 += ".Scan the material";


                        }
                        else {
                            botResponse1 = "No Material for this PO";
                        }

                        return res.json({
                            speech: botResponse1,
                            displayText: botResponse1,
                            // speech: optionIntentname,
                            // displayText: optionIntentname,
                            source: "webhook-echo-sample",
                            contextOut: [{
                                name: "c_counter",
                                lifespan: "10",
                                parameters: {
                                    key: itemcount
                                    //   key: "3"

                                }
                            }
                            ]


                        });

                        //console.log(botResponse);
                    }


                });
                // }
                // }
                // }

            }
        });



    }

    else if (actionName == "action_scanmaterial") {
        var cname = app.getContext('cmaterial');
        var mat = cname.parameters.material;
        var pnum = cname.parameters.ponumber;
        request({
            //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
            url: url + "Get_PoItem_DetailsSet?$filter=PoNumber%20eq%20%27" + pnum + "%27%20and%20MoveType%20eq%20%27101%27&sap-client=900&sap-language=EN&$format=json",


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
                var flag = "";
                var obj = [];
                var i = 0;
                if (c1.d.results.length > 0) {

                    for (; i < len1; i++) {

                        if (c1.d.results[i].Material == matno) {
                            botResponse1 = "Enter Quantity."
                            flag = "1";
                            break;
                        }


                    }



                }

                else {
                    botResponse1 = "Material not matched.Scan againnnnnnnnnn"
                }

                if (flag == "1") {
                    return res.json({
                        speech: botResponse1,
                        displayText: botResponse1,
                        // speech: optionIntentname,
                        // displayText: optionIntentname,
                        source: "webhook-echo-sample",
                        contextOut: [{
                            name: "cQuantity",
                            lifespan: "1",
                            parameters: {
                                cmaterial: matno
                                //   key: "3"

                            }

                        }
                        ]






                    });
                }

                else {
                    return res.json({
                        //   speech: "Material not matched.Scan again..",
                        //  displayText: "Material not matched.Scan again..",
                        speech: "Material not matched.Scan again!!",
                        displayText: "Material not matched.Scan again!!",
                        source: "webhook-echo-sample",
                        contextOut: [{
                            name: "cmaterial",
                            lifespan: "10",
                            parameters: {
                                material: matno,
                                ponumber: pnum
                                //   key: "3"

                            }

                        }
                        ]





                    });
                }


                //console.log(botResponse);
            }


        });




    }









    else if (quantity != "zeroQuant") {
        var response = "";
        var z = app.getContextArgument('c_counter', 'key');
        var tempContext = app.getContext('c_counter');
        var originalTemp = tempContext.parameters.key;
        var pnum = tempContext.parameters.ponumber;
        var m = tempContext.parameters.material ? tempContext.parameters.material : "nomatno";
        if (m != "nomatno") {
            cmaterial = m;
        }
        request({
            //url: url + "GetMenuInfoSet?$filter=TileId%20eq%20%27WM_INB%27&sap-client=900&sap-language=EN&$format=json",
            url: url + "Get_PoItem_DetailsSet?$filter=PoNumber%20eq%20%27" + pnum + "%27%20and%20MoveType%20eq%20%27101%27&sap-client=900&sap-language=EN&$format=json",


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
                var response = "";
                var flag = "";
                var obj = [];
                var i = 0;
                if (c1.d.results.length > 0) {

                    for (; i < len1; i++) {

                        if (c1.d.results[i].Material == cmaterial) {

                            var quant = c1.d.results[i].OpenQuantity;
                            if (quantity > quant || quant <= "0") {
                                response = "Quantitiy should be less than or equalto " + quant;
                                flag = "1";
                                break;
                            }


                        }


                    }

                    if (flag == "1") {
                        return res.json({
                            //   speech: "Material not matched.Scan again..",
                            //  displayText: "Material not matched.Scan again..",
                            speech: response,
                            displayText: response,
                            source: "webhook-echo-sample",
                            contextOut: [{
                                name: "cQuantity",
                                lifespan: "1",


                            }
                            ]





                        });

                    }


                    else if (flag == "") {
                        if (originalTemp >= 0) {
                            response = "Material " + cmaterial + " confirmed. Sacn another material";
                            //response = "Material " + m + " confirmed. Sacn another material";
                            var c = originalTemp;
                            var c1 = --c;
                            if (c1 != "0") {
                                return res.json({
                                    speech: response,
                                    displayText: response,
                                    // speech: optionIntentname,
                                    // displayText: optionIntentname,
                                    source: "webhook-echo-sample",
                                    contextOut: [{
                                        name: "c_counter" + originalTemp + "",
                                        lifespan: "10",
                                        parameters: {
                                            quant: quantity,
                                            materialname: cmaterial

                                        }
                                    },
                                    {
                                        name: "c_counter",
                                        lifespan: "10",
                                        parameters: {
                                            key: c1,


                                        }
                                    }
                                    ]


                                });
                            }
                            else {
                                var j = len1;
                                var contextobj = [];
                                var contextentity = {};
                                var entity = {};
                                var obj = [];
                                var entity2 = {};
                                var response = "";
                                     var entity1;

                                for (; j >=1; j--) {
                                    if (j != 1) {
                                        var Context_1 = app.getContext('c_counter' + j);
                                        var mat_1 = Context_1.parameters.materialname;
                                        var val_1 = Context_1.parameters.quant;

                                        contextentity = {

                                            'material': mat_1,
                                            'openquantity': val_1
                                        }

                                        contextobj.push(contextentity);
                                    }

                                    else {

                                        contextentity = {

                                            'material': cmaterial,
                                            'openquantity': quantity
                                        }

                                        contextobj.push(contextentity);
                                    }
                                }


                                var n = 0;
                                var q = 0;
                                var e = contextobj.length;
                                for (; n < len1; n++) {

                                    for (; q < e; q++) {
                                        var tosavematerial = contextobj[q].material;
                                        var tosavequant = contextobj[q].openquantity;

                                        if (c1.d.results[n].Material == tosavematerial) {

                                    if (tosavematerial =="2") {
                                        entity1 = {
                 "Material":c1.d.results[n].Material,
                "Plant":c1.d.results[n].Plant,
                "StgeLoc":c1.d.results[n].StLoc,
                "Batch":c1.d.results[n].Batch,
                "Vendrbatch":c1.d.results[n].VendorBatch,
                //  'MovType': c.d.results[0].MovType,
                "MoveType":'101',
                "StckType":c1.d.results[n].StockType,
                "SpecStock":c1.d.results[n].SpecialStock,
                "Vendor":"VENDOR",
                "ValType":c1.d.results[n].ValuationType,
                "EntryQnt":c1.d.results[n].OpenQuantity,
                "EntryUom":c1.d.results[n].Uom,
                "PoNumber":c1.d.results[n].PoNumber,
                "PoItem":c1.d.results[n].ItemNo,
                "MvtInd":'B'
                // 'SerialnoAutoNumberassignment': c.d.results[0].SerialSpecified


            }
                                                obj.push(entity1);

                                            }

                                            else if (tosavematerial == "43") {
                                                entity1 = {

                                                    'Material': c1.d.results[n].Material,
                                                    'Plant': c1.d.results[n].Plant,
                                                    'StgeLoc': c1.d.results[n].StLoc,
                                                    'Batch': c1.d.results[n].Batch,
                                                    'Vendrbatch': c1.d.results[n].VendorBatch,
                                                    //  'MovType': c.d.results[0].MovType,
                                                    'MoveType': '101',
                                                    'StckType': c1.d.results[n].StockType,
                                                    'SpecStock': c1.d.results[n].SpecialStock,
                                                    'Vendor': 'VENDOR',
                                                    'ValType': c1.d.results[n].ValuationType,
                                                    'EntryQnt': contextobj[q].openquantity,
                                                    'EntryUom': c1.d.results[n].Uom,
                                                    'PoNumber': c1.d.results[n].PoNumber,
                                                    'PoItem': c1.d.results[n].ItemNo,
                                                    'MvtInd': 'B'
                                                    // 'SerialnoAutoNumberassignment': c.d.results[0].SerialSpecified


                                                }
                                                obj.push(entity1);

                                            }

                                            else if (tosavematerial == "42") {
                                                entity1 = {

                                                    'Material': c1.d.results[n].Material,
                                                    'Plant': c1.d.results[n].Plant,
                                                    'StgeLoc': c1.d.results[n].StLoc,
                                                    'Batch': c1.d.results[n].Batch,
                                                    'Vendrbatch': c1.d.results[n].VendorBatch,
                                                    //  'MovType': c.d.results[0].MovType,
                                                    'MoveType': '101',
                                                    'StckType': c1.d.results[n].StockType,
                                                    'SpecStock': c1.d.results[n].SpecialStock,
                                                    'Vendor': 'VENDOR',
                                                    'ValType': c1.d.results[n].ValuationType,
                                                    'EntryQnt': contextobj[q].openquantity,
                                                    'EntryUom': c1.d.results[n].Uom,
                                                    'PoNumber': c1.d.results[n].PoNumber,
                                                    'PoItem': c1.d.results[n].ItemNo,
                                                    'MvtInd': 'B',
                                                    'SerialnoAutoNumberassignment': 'false'


                                                }
                                                obj.push(entity1);

                                            }

                                        }
                                    }
                                }

                                entity = {
                           "PstngDate": "2018-07-26T00:00:00",
                        "DocDate":"2018-07-26T00:00:00",
                        "PrUname":"xy",
                        "HeaderTxt":"",
                        "GmCode": "01",
                        "MatItemRel":obj
            }


                                // Do post

                                request({


                                    // url: url + "MaterialDocHdrSet?sap-client=900&sap-language=EN",

                                    url: url1+"MaterialDocHdrSet?sap-client=900&sap-language=EN",
                                    //url: url + "MaterialDocHdrSet",
                                    method: 'POST',
                                    headers: {
                                      //  "Authorization": "Basic c2FwdXNlcjpjcmF2ZTEyMw==",
                                        "Content-Type": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                        "x-csrf-token": "" // set CSRF Token for post or update
                                    },

                                    json:entity
                                }, function (error, response1, body) {

                                    // handle response
                                    if (!error && response1.statusCode == 201) {

                                        response = "GR successful";
                                        // console.log(response1.statusCode);
                                    }
                                    else {
                                        response = "GR Failed!!!!!";
                                        console.log(response1.statusCode);
                                    }




                                });


                                /////////////////////////////////end post///////////////////////



                                return res.json({
                                    // speech: "GR successful",
                                    // displayText: "GR successful",
                                    speech: e,
                                    displayText: e,
                                    source: "webhook-echo-sample",
                                    contextOut: [{
                                        name: "c_counter" + originalTemp + "",
                                        lifespan: "20",
                                        parameters: {
                                            quant: quantity,
                                            materialname: cmaterial

                                        }
                                    },
                                                    {
                                                        name: "c_counter",
                                                        lifespan: "10",
                                                        parameters: {
                                                            key: c1,


                                                        }
                                                    }
                                    ]


                                });


                                //  });

                            }



                        }
                        else {
                            return res.json({
                                speech: "GR successful",
                                displayText: "GR successful",
                                // speech: optionIntentname,
                                // displayText: optionIntentname,
                                source: "webhook-echo-sample",



                            });

                        }
                    }

                }











                //console.log(botResponse);
            }


        });


    }


        ///Block for Back function//////////////////////




        //////////////////////////////////////














    else {
        return res.json({
            speech: "Error",
            displayText: "Error",

            source: "webhook-echo-sample",


        });
    }



});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});
