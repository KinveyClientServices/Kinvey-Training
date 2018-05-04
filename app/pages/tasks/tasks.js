var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var observable_array_1 = require("data/observable-array");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;

var observable = require("data/observable");
var tmpobservable = new observable.Observable();

var TasksPage = function () { };
TasksPage.prototype = new BasePage();
TasksPage.prototype.constructor = TasksPage;

// Place any code you want to run when the home page loads here.
TasksPage.prototype.contentLoaded = function (args) {
    console.log('tasks loaded');
    var page = args.object;
    myItems = new observable_array_1.ObservableArray();
    //TASK 3.2: RETRIEVE TASKS FROM NETWORK STORE

    /*  .subscribe(function (entities) {
         console.log(entities);
         while (myItems.length > 0) {
             myItems.pop();
         }
         for (i = 0; i < entities.length; i++) {
             console.log(entities[i]);
             myItems.push(entities[i]);
         }
         tmpobservable.set("myItems", myItems);
         page.bindingContext = tmpobservable;
     }, function (error) {
         console.log(error);
     }, function () {
         console.log('pulled tasks');
     }); */


};
function onPageLoaded(args) {
    console.log('tasks page loaded');

};
exports.navigateTo = function (args) {
    console.log('HERE');
};
module.exports = new TasksPage();
exports.onPageLoad = onPageLoaded;