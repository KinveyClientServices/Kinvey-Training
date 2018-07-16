var application = require("application");

//TASK 1.3: INITIALIZE KINVEY

console.log('inside app.js');
application.start({ moduleName: "pages/home/home" });