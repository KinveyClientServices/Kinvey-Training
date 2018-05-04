var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var observableArray = require("data/observable-array");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var observable_array_1 = require("data/observable-array");
var observable_1 = require("data/observable");
var myItems;
var tmpobservable;


var OfflinePage = function() {};
OfflinePage.prototype = new BasePage();
OfflinePage.prototype.constructor = OfflinePage;

var synched = false;


OfflinePage.prototype.contentLoaded = function(args) {

    console.log('load offline content');
    myItems = new observable_array_1.ObservableArray();
    var page = args.object;
    var dataStore = Kinvey.DataStore.collection('reminders', Kinvey.DataStoreType.Network);
    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {
        console.log(JSON.stringify(entities));

        for (i = 0; i < entities.length; i++) {

            myItems.push(entities[i]);
        }

        tmpobservable = new observable_1.Observable();
        tmpobservable.set("myItems", myItems);
        page.bindingContext = tmpobservable;

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('reminder data fetch complete');
    });
};

OfflinePage.prototype.syncMe = function(args) {
    console.log('sync me');

    var dataStore = Kinvey.DataStore.collection('reminders', Kinvey.DataStoreType.Sync);

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
        message: "Reminders synched to the backend.",
        okButtonText: "ok"
    }).then(function() {
        console.log("Dialog closed!");
    });



};

OfflinePage.prototype.addMe = function(args) {

    var dataStore = Kinvey.DataStore.collection('reminders', Kinvey.DataStoreType.Sync);

    console.log('add offline items');
    console.log(myItems.length);

    var tasks = [];
    for (var i = 0; i < 10; i++) {
        const task = {
            "icon": "res://exam",
            "remindname": "Reminder #" + i,
            "autogen": true,
            "notes": "Note #" + i
        }
        tasks.push(task);
    }

    console.log(tasks.length);

    for (i = 0; i < tasks.length; i++) {
        myItems.push(tasks[i]);
    }

    for (var i = 0; i < tasks.length; i++) {
        console.log(JSON.stringify(tasks[i]));

        // persist reminder data to local store
        //
        var promise = dataStore.save(tasks[i])
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
        message: tasks.length + " reminders added to local storage.",
        okButtonText: "ok"
    }).then(function() {
        console.log("Dialog closed!");
    });


};

function onPageLoaded(args) {
    console.log('offline page loaded');

};


module.exports = new OfflinePage();
exports.onPageLoad = onPageLoaded;