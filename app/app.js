var application = require("application");
var Kinvey = require("kinvey-nativescript-sdk").Kinvey;
//TASK 1.3: INITIALIZE KINVEY
Kinvey.init({
    appKey: 'kid_BkpDu0dpZ',
    appSecret: '595ac2474b2441b7a3d7e6c6d609a39a'
});
console.log('inside app.js');
application.start({ moduleName: "pages/home/home" });