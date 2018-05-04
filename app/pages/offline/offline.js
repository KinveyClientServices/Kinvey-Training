var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var AccountsPage = function() {};
AccountsPage.prototype = new BasePage();
AccountsPage.prototype.constructor = AccountsPage;
var myItems;
var observable_array_1 = require("data/observable-array");
var tmpobservable = new observable.Observable();;

// Place any code you want to run when the home page loads here.
AccountsPage.prototype.contentLoaded = function(args) {
    var page = args.object;

    myItems = new observable_array_1.ObservableArray();

    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);

    // load doctor data
    //
    var subscription = dataStore.find()
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
        });

    //
};

AccountsPage.prototype.addMe = function(args) {
    console.log('add me');

    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Sync);

    console.log('add offline items');
    console.log(myItems.length);

    var myaccounts = [];
    for (var i = 0; i < 10; i++) {
        const thisaccount = {
            "accountname": "Account #" + i,
            "autogen": true,
            "accountcompany": "Company #" + i
        }
        myaccounts.push(thisaccount);
    }

    console.log(myaccounts.length);

    for (i = 0; i < myaccounts.length; i++) {
        myItems.push(myaccounts[i]);
    }

    for (var i = 0; i < myaccounts.length; i++) {
        console.log(JSON.stringify(myaccounts[i]));

        // persist reminder data to local store
        //
        var promise = dataStore.save(myaccounts[i])
            .then(function(entity) {
                console.log(entity);
                myItems.push(entity);
            })
            .catch(function(error) {
                console.log(error);
            });

        //
    }

    var dialogs = require("ui/dialogs");
    dialogs.alert({
        title: "Local Save",
        message: myaccounts.length + " accounts added to local storage.",
        okButtonText: "ok"
    }).then(function() {
        console.log("Dialog closed!");
    });
}

AccountsPage.prototype.syncMe = function(args) {
    console.log('syncMe');

  console.log('sync me');

    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Sync);

    // sync data from the local store to the backend
    //
    var promise = dataStore.sync()
        .then(function(entities) {
           console.log(entities.push.length);
           console.log(entities.pull.length);
        })
        .catch(function(error) {
            console.log(error);
        });

    //

    var dialogs = require("ui/dialogs");
    dialogs.alert({
        title: "Sync",
        message: "Accounts synched to the backend.",
        okButtonText: "ok"
    }).then(function() {
        console.log("Dialog closed!");
    });

};

function onPageLoad(args) {
    console.log('accounts page loaded');

};

module.exports = new AccountsPage();
exports.onPageLoad = onPageLoad;