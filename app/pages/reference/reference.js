var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var ReferencesPage = function () { };
ReferencesPage.prototype = new BasePage();
ReferencesPage.prototype.constructor = ReferencesPage;
var myItems;
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();;

// Place any code you want to run when the home page loads here.
ReferencesPage.prototype.contentLoaded = function (args) {
    var page = args.object;

    myItems = new observable_array_1.ObservableArray();

    var query = new Kinvey.Query();
    query.equalTo('mimeType', 'application/pdf');
    var promise = Kinvey.Files.find(query)
        .then(function (files) {
            console.dir(files[0]);

            while (myItems.length > 0) {
                myItems.pop();
            }
            for (i = 0; i < files.length; i++) {
                console.log(files[i]);
                myItems.push(files[i]);
            }

            console.log(String.fromCharCode(0xe903));

            tmpobservable.set("myItems", myItems);
            page.bindingContext = tmpobservable;
        })
        .catch(function (error) {
            console.log(error);
        });

    //var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);

    // load doctor data
    //
    /*var subscription = dataStore.find()
        .subscribe(function(entities) {
            console.log(entities);
            while(myItems.length > 0 ) {
                myItems.pop();
            }
            for (i=0;i<entities.length;i++) {
                console.log(entities[i]);
                myItems.push(entities[i]);
            }

            tmpobservable.set("myItems", myItems);
            page.bindingContext = tmpobservable;
        }, function(error) {
            console.log(error);
        }, function() {
            console.log('pulled accounts');
        });*/

    //
};

ReferencesPage.prototype.refreshMe = function (args) {
    console.log('refreshMe');

    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {

        console.log(entities.length);

        while (myItems.length > 0) {
            myItems.pop();
        }

        for (i = 0; i < entities.length; i++) {

            console.log(entities[i]);
            myItems.push(entities[i]);
        }

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('doctors data fetch complete');
    });
};

ReferencesPage.prototype.onItemTap = function (args) {
    console.log('tapped reference item');
    const tappedItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: "pages/ref-detail/ref-detail",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

function onPageLoad(args) {
    console.log('doctors page loaded');

};

module.exports = new ReferencesPage();
exports.onPageLoad = onPageLoad;
//exports.onItemTap = onItemTap;