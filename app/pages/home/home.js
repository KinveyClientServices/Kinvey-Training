var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var observableModule = require("data/observable");
var color_1 = require("color");

//Getting a reference to the application.
var application = require("application");

var HomePage = function () { };
HomePage.prototype = new BasePage();
HomePage.prototype.constructor = HomePage;

var source = new observableModule.Observable();

// Place any code you want to run when the home page loads here.
HomePage.prototype.contentLoaded = function (args) {
    var page = args.object;
    console.log('home loaded');
    const accountsStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    accountsStore.subscribe({
        onMessage: (m) => {
            alert(m);
        },
        onStatus: (s) => {
            // handle status events, which pertain to this collection
        },
        onError: (e) => {
            alert(e);
        }
    })
        .then(() => {/* success */ })
        .catch(e => {/* handle error */ });

    var activeUser = Kinvey.User.getActiveUser();
    if (!activeUser) {
        topmost().navigate("pages/login/login");
    }
    else {
        var dataStore = Kinvey.DataStore.collection('DemoBrandingData', Kinvey.DataStoreType.Network);
        // Pull branding data
        var subscription = dataStore.find()
            .subscribe(function (entities) {
                //console.log(entities);
                page.bindingContext = { brand: entities[0] };
                //Method to apply brand css to the application
                applyBrandCss(args.object, entities[0]);
            }, function (error) {
                console.log(error);
            }, function () {
                var page = args.object;
                console.log('finished pulling home data');
            });
    }

}

HomePage.prototype.navigatingTo = function (args) {
    console.log('navigating to');
    var page = args.object;
}

applyBrandCss = function (page, brandData) {
    page.addCss(`#tagline {
        color:`+ brandData.PrimaryTextColor + `
    }
    action-bar {
        background-color:`+ brandData.PrimaryColor + `;
        color:#FFFFFF;
    }`);
    application.addCss(`
    label {
        color:`+ brandData.PrimaryTextColor + `;
    } 
    action-bar {
        background-color:`+ brandData.PrimaryColor + `;
        color:#FFFFFF;
    }
    navigation-button{
        color:#FFFFFF.
        text-color:#FFFFFF
    }`
    );
}




module.exports = new HomePage();