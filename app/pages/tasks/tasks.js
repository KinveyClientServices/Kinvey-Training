var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var observable_array_1 = require("data/observable-array");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;

var observable = require("data/observable");
var tmpobservable = new observable.Observable();
var myItems = new observable_array_1.ObservableArray();

var dataStore;

var TasksPage = function () { };
TasksPage.prototype = new BasePage();
TasksPage.prototype.constructor = TasksPage;

// Place any code you want to run when the home page loads here.
TasksPage.prototype.contentLoaded = function (args) {
    console.log('tasks loaded');
    var page = args.object;
    page.bindingContext = tmpobservable;
    //TASK 3.2: RETRIEVE TASKS FROM SYNC STORE
    dataStore = Kinvey.DataStore.collection('tasks', Kinvey.DataStoreType.Sync);
};

TasksPage.prototype.refreshMe = function (args) {
    console.log('refreshMe');
    var subscription = dataStore.find()
        .subscribe(function (entities) {
            console.log("Retrieved " + entities.length + " records");
            while (myItems.length > 0) {
                myItems.pop();
            }
            for (i = 0; i < entities.length; i++) {
                //console.log(entities[i]);
                myItems.push(entities[i]);
            }
            tmpobservable.set("myItems", myItems);
        }, function (error) {
            console.log(error);
        });
};

TasksPage.prototype.syncMe = function (args) {
    console.log('syncMe');
    //TASK: SYNC CODE
    var promise = dataStore.sync()
        .then(function (syncLog) {
            console.dir(syncLog);
        })
        .catch(function (error) {
            console.log("Sync Failed: " + error);
        });
};

TasksPage.prototype.pullMe = function (args) {
    //TASK: PULL CODE
    const promise = dataStore.pull()
        .then(function (numOfRecords) {
            console.log("Pulled down : " + numOfRecords);
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });

};

TasksPage.prototype.pushMe = function (args) {
    //TASK: PUSH CODE
    var promise = dataStore.push()
        .then(function (result) {
            console.log("Push Success : " + result);
        })
        .catch(function (error) {
            console.log("Push Failed : " + error);
        });
};



function onPageLoaded(args) {
    console.log('tasks page loaded');

};
exports.navigateTo = function (args) {
};
module.exports = new TasksPage();
exports.onPageLoad = onPageLoaded;