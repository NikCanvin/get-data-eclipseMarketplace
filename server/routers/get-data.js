const express = require('express');
var request = require('request');
const timestamp = require('time-stamp');

module.exports = function (app) {
  const router = express.Router();

  router.get('/', function (req, res, next) {

    request({

    uri: "https://marketplace.eclipse.org/content/codewind#group-metrics-tab",

    }, function(error,response,body){

        var bodyArray = body.split(/\r?\n/);
        var foundMetrics="no";
        var gotData;
        gotData = "Eclipse Marketplace metrics: "+timestamp.utc('YYYY/MM/DD:HH:mm:ss'); 
        for (i = 0; i < bodyArray.length; i++) {
            if ( bodyArray[i].includes("<thead><tr><th>Date</th><th>Ranking</th><th>Installs</th><th>Clickthroughs</th> </tr></thead>")) {
                foundMetrics="yes";
                //console.log("line"+i+" "+bodyArray[i]);
            }
            if ( foundMetrics=="yes" ) {
                if ( bodyArray[i].includes("</table>") ) {
                    foundMetrics="no";
                } else {
                  gotData += bodyArray[i]+",";
                }
            }
        }
        res.status(200).send(gotData);

    }
);


    //const stringToReturn = "Hey there, this is codewind saying hi and thanks for using me"
    //res.status(200).send(stringToReturn);
    });

  app.use('/get-data', router);
}

    //router.get('/rules', (req, res) => {
        // request({

        //     uri: "https://marketplace.eclipse.org/content/codewind#group-metrics-tab",

        //     }, function(error,response,body){
        
        //         //console.log(body);
        //         var bodyArray = body.split(/\r?\n/);
        //         //console.log (bodyArray.length);
        //         //var metricsTableStart = bodyArray.indexOf("</div><table class=\"table table-hover table-striped table-bordered sticky-enabled\"></table>");
        //         //console.log (metricsTableStart);
        //         var foundMetrics="no";
        //         console.log("Eclipse Marketplace metrics:")
        //         console.log(timestamp.utc('YYYY/MM/DD:HH:mm:ss'));
        //         for (i = 0; i < bodyArray.length; i++) {
        //             if ( bodyArray[i].includes("<thead><tr><th>Date</th><th>Ranking</th><th>Installs</th><th>Clickthroughs</th> </tr></thead>")) {
        //                 foundMetrics="yes";
        //                 //console.log("line"+i+" "+bodyArray[i]);
        //             }
        //             if ( foundMetrics=="yes" ) {
        //                 if ( bodyArray[i].includes("</table>") ) {
        //                     foundMetrics="no";
        //                 } else {
        //                     console.log(bodyArray[i]);
        //                 }
        //             }
        //             //console.log("line"+i+" "+bodyArray[i]);
        //         }

        //     }
        // );
    //});