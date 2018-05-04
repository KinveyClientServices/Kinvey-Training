var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var geolocation = require("nativescript-geolocation");
var mapbox = require("nativescript-mapbox");
var mapmarkers = [];
var counter = 0;
var Page;
var activeUser;
var mapObject;
var MapPage = function () { };
MapPage.prototype = new BasePage();
MapPage.prototype.constructor = MapPage;

// Place any code you want to run when the home page loads here.
MapPage.prototype.contentLoaded = function (args) {
    console.log('map loaded');

};
MapPage.prototype.onPageLoaded = function (args) {
    console.log('map page loaded');
    Page = args;
    //TASK 4.2: Register for Live Service

};
MapPage.prototype.changeMe = function (args) {
    //remove all markers
    mapObject.removeMarkers();
    console.log('change me');
    counter++;
    var sender = args.object;
    var parent = sender.parent;
    var thisdist = view.getViewById(parent, "distance");
    var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, timeout: 20000 }).
        then(function (loc) {
            if (loc) {
                //var coord = [loc.longitude, loc.latitude];
                var coord = [46.306780, 16.336156]; //Use this for the search instead of geo coordinates.
                var query = new Kinvey.Query();
                console.log(thisdist.text);
                query.near('_geoloc', coord, Number(thisdist.text));
                var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
                var stream = dataStore.find(query);
                stream.subscribe(function onNext(entities) {
                    console.log(entities.length);
                    // put _geoloc points on the map
                    mapmarkers = [];
                    for (i = 0; i < entities.length; i++) {
                        thisaccount = entities[i];
                        mapmarkers.push({
                            lat: thisaccount._geoloc[0],
                            lng: thisaccount._geoloc[1],
                            title: thisaccount.accountname,
                            subtitle: thisaccount.accountcompany
                        });
                    }
                    mapObject.addMarkers(mapmarkers);
                }, function onError(error) {
                    console.log(error);
                }, function onComplete() {
                    console.log('account map data fetch complete');
                });
            }
        }, function (e) {
            console.log("Error: " + e.message);
        });
}
MapPage.prototype.onMapReady = function (args) {
    console.log('map ready');
    mapObject = args.map;
    //Task 5.4: Instead of querying the collection, let's use Live Service to susbcribe to changes.
    var accountsDataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    accountsDataStore.subscribe({
        onMessage: function (m) {
            // handle incoming updates of entities in this collection
            console.log(m);
            mapmarkers.push({
                lat: m._geoloc[0],
                lng: m._geoloc[1],
                title: m.accountname,
                subtitle: m.accountcompany
            });
            mapObject.addMarkers(mapmarkers);
        },
        onStatus: function (s) {
            // handle status events, which pertain to this collection
            alert("Incoming Status");
        },
        onError: function (e) {
            // handle error events, which pertain to this collection
            alert("Incoming Error");
        }
    }).then(function () {
        console.log("Successs");
    })
        .catch(function (e) {
            console.log(e);

        })
}
exports.navigateTo = function (args) {
    console.log('HERE');
};
module.exports = new MapPage();