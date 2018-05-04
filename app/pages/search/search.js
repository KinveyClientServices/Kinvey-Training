var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var array = new observableArray.ObservableArray();


var SearchPage = function () { };
SearchPage.prototype = new BasePage();
SearchPage.prototype.constructor = SearchPage;

var viewModel = new Observable();
var model = { img: "" };

// Place any code you want to run when the home page loads here.
SearchPage.prototype.contentLoaded = function (args) {
    console.log('search loaded');

    var dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Cache);
    var stream = dataStore.find();
    stream.subscribe(function onNext(entities) {
        //console.log(JSON.stringify(entities));

        var page = args.object;

        for (i = 0; i < entities.length; i++) {
            array.push(entities[i].shorttitle);
            console.log(entities[i].shorttitle);
        }

        console.log('array length = ' + array.length);
        //var page = args.object;
        //array.push("WE MAKE IT EASY TO ACCESS YOUR EXISTING DATA");
        //array.push("PROTECT YOUR USERS AND SECURE YOUR DATA");

        //array.push(entities);
        viewModel.set("items", array);
        viewModel.set("selectedIndex", 1);
        viewModel.set("Nimg", "");
        viewModel.set("title", "");
        page.bindingContext = viewModel;


    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('product data complete');
        console.log('on complete array length = ' + array.length);
    });

};

SearchPage.prototype.onPageLoaded = function (args) {
    console.log('search page loaded');

};

SearchPage.prototype.dropDownOpened = function (args) {
    console.log('dropdown opened');
}

SearchPage.prototype.onSearchSubmit = function (args) {
    console.log("Searching now!");
    var searchbar = args.object;
    console.log("Search submit result: " + searchbar.text);
    //Find the item in the DataStore (cached hopefully)
    var dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Cache);
    var query = new Kinvey.Query();
    query.matches('shorttitle', '^' + searchbar.text);
    var stream = dataStore.find(query);
    stream.subscribe(function onNext(entities) {
        console.log(entities);
        console.log(entities.length);
        viewModel.set("Nimg", entities[0].Nimg);
        viewModel.set("title", entities[0].title);

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('complete query');
    });



}

SearchPage.prototype.dropDownSelectedIndexChanged = function (args) {
    var page = args.object;
    console.log('dropDownSelectedIndexChanged');
    console.log(args.oldIndex);
    console.log(args.newIndex);

    // find  entity matching title
    //
    var dataStore = Kinvey.DataStore.collection('products', Kinvey.DataStoreType.Cache);
    console.dir(args);
    console.dir(array);
    console.log(array.length);
    console.log(array._array[args.newIndex]);

    /*var output = '';
for (var property in args) {
        output += property + ': ' + args[property] + '; ';
    }
    alert(output);*/

    console.log(args.object.selectedIndex);
    var query = new Kinvey.Query();
    query.equalTo('shorttitle', array._array[args.newIndex]);
    var stream = dataStore.find(query);
    stream.subscribe(function onNext(entities) {
        console.log(entities);
        console.log(entities.length);

        // bind to UI
        //
        viewModel.set("Nimg", entities[0].Nimg);
        viewModel.set("title", entities[0].title);

    }, function onError(error) {
        console.log(error);
    }, function onComplete() {
        console.log('complete query');
    });


    viewModel.set("selectedIndex", args.newIndex);


    //page.bindingContext = {"selectedIndex": args.newIndex};
}

exports.navigateTo = function (args) {
    console.log('HERE');
};

module.exports = new SearchPage();
//exports.onPageLoad = onPageLoaded;