var BasePage = require("../../shared/BasePage");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var geolocation = require("nativescript-geolocation");
var mapmarkers = [];
var counter = 0;
var Page;
var mapObject;
var pageContext;
var locationObject;

var MapPage = function () { };
MapPage.prototype = new BasePage();
MapPage.prototype.constructor = MapPage;

MapPage.prototype.onPageLoaded = function (args) {
    console.log('map page loaded');
    Page = args.object;
    var promise = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, timeout: 20000 });
    promise.then((location) => {
        pageContext = new Observable();
        pageContext.set("location", location);
        locationObject = location;
        Page.bindingContext = pageContext;
    });
    promise.catch((error) => {
        console.log("An error occurred :" + error);
    });
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
                var dataStore = Kinvey.DataStore.collection('location', Kinvey.DataStoreType.Network);
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
                            title: m.name,
                            subtitle: m.developer
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
    //Setting the center of the map to be the users current location
    var currentLat = locationObject.latitude;
    var currentLon = locationObject.longitude;

    mapObject.setCenter(
        {
            lat: currentLat, // mandatory
            lng: currentLon, // mandatory
            animated: false // default true
        });
    //Set marker in the center of the map
    mapObject.addMarkers([{
        lat: currentLat,
        lng: currentLon,
    }]);
    ///Task 5.4: Instead of querying the collection, let's use Live Service to susbcribe to changes.

}
exports.navigateTo = function (args) {
    console.log('HERE');
};
module.exports = new MapPage();