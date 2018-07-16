var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var ObservableArrayClass = require("data/observable-array");
var AccountsViewModel = require("./accounts-view-model");

var AccountsPage = function () { };

AccountsPage.prototype = new BasePage();
AccountsPage.prototype.constructor = AccountsPage;

var myItems = new ObservableArrayClass.ObservableArray();
var viewModel = new AccountsViewModel();

// Place any code you want to run when the home page loads here.
AccountsPage.prototype.contentLoaded = function (args) {
    var page = args.object;
    page.bindingContext = viewModel;
    //TASK 3.1: RETRIEVE THE ACCOUNTS 

    /* .subscribe(function (entities) {
        console.log("Retrieved : " + entities.length);
        //First clearing the myItems array.
        while (myItems.length > 0) {
            myItems.pop();
        }
        for (i = 0; i < entities.length; i++) {
            //console.log(entities[i]);
            myItems.push(entities[i]);
        }
        viewModel.set("myItems", myItems);
    }, function (error) {
        console.log(error);
    }, function () {
        console.log('pulled accounts');
    }); */
};
AccountsPage.prototype.selectAccount = function (args) {
    console.log('select account : ' + args.index);
    var targetAccount = myItems.getItem(args.index);
    console.dir(targetAccount);
    topmost().navigate({
        moduleName: "pages/accountdetail/accountdetail",
        context: { myid: targetAccount._id },
        animated: true
    });
}
AccountsPage.prototype.refreshMe = function (args) {
    console.log('refreshMe');
    var dataStore = Kinvey.DataStore.collection('accounts');
    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {
        console.log("Returned " + entities.length + "items");
        while (myItems.length > 0) {
            myItems.pop();
        }
        for (i = 0; i < entities.length; i++) {
            //console.log(entities[i]);
            myItems.push(entities[i]);
        }
    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('accounts data fetch complete');
    });
};
function onPageLoad(args) {
    console.log('accounts page loaded');

};
module.exports = new AccountsPage();
exports.onPageLoad = onPageLoad;