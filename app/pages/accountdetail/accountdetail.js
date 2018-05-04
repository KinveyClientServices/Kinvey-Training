var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var Frame = require("ui/frame");
var AccountDetailPage = function () { };
AccountDetailPage.prototype = new BasePage();
AccountDetailPage.prototype.constructor = AccountDetailPage;
var tmpobservable = new observable.Observable();

// Place any code you want to run when the home page loads here.
AccountDetailPage.prototype.contentLoaded = function (args) {
    var page = args.object;

}
AccountDetailPage.prototype.goBack = function (args) {
    console.log('goback');

    topmost().navigate("pages/accounts/accounts");
}

AccountDetailPage.prototype.onPageLoad = function (args) {
    console.log('account detail page loaded');
    var page = args.object;
    console.dir(page.navigationContext.myid);
    var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    var stream = dataStore.findById(page.navigationContext.myid);
    stream.subscribe(function onNext(entity) {
        console.dir(entity);
        tmpobservable.set("name", entity.accountname);
        tmpobservable.set("company", entity.accountcompany);
        page.bindingContext = tmpobservable;
    }, function onError(error) {
        console.log(error);
    }, function onComplete() {

        console.log('account detail data fetch complete');
    });

};

module.exports = new AccountDetailPage();
