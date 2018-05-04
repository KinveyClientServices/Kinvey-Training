var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var observableModule = require("data/observable");


var HomePage = function() {};
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;

var source = new observableModule.Observable();

HomePage.prototype.onNavigatingTo = function(args) {
    console.log('navigated to ref detail');
    console.dir(args.context._id);

    // now take the id and fetch the file from the Kinvey filestore
    //
    var promise = Kinvey.Files.stream(args.context._id)
        .then(function(file) {
            var fileURL = file._downloadURL;
            console.dir(fileURL);

            // now we just need to bind the URL to the UI
            //
            var page = args.object;
            page.bindingContext = { url: fileURL };
        })
        .catch(function(error) {
            console.log(error);
        });

       
}




// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function(args) {

    console.log('ref detail loaded');

    console.log(args);

    const page = args.object;

    console.log(page.navigationContext);


}

HomePage.prototype.onBackButton = function() {
    topmost().goBack();
    /*navigate({
            moduleName: "pages/reference/refreference",
            //context: tappedItem,
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });*/
}

module.exports = new HomePage();