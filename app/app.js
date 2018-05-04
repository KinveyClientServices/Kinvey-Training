var application = require("application");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;

//TASK 1.3: INITIALIZE KINVEY
Kinvey.init({
    appKey: 'kid_BkpDu0dpZ',
    appSecret: '576cee7e470f417f99395bba8f071ab8'
});

console.log('inside app.js');
application.start({ moduleName: "pages/home/home" });