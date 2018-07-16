var BasePage = require("../../shared/BasePage");
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var geolocation = require("nativescript-geolocation");
var mapbox = require("nativescript-mapbox");
var platform = require("platform");
var isIOS = platform.device.os === platform.platformNames.ios;

var mapmarkers = [];
var counter = 0;
var Page;
var mapObject;
var pageContext;
var locationObject;
var isMapLoaded = false;

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
        //Set the center of the map if map is loaded and ready
        if (isMapLoaded) {
            mapObject.setCenter(
                {
                    lat: location.latitude, // mandatory
                    lng: location.longitude, // mandatory
                    animated: false // default true
                });
        }
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
    isMapLoaded = !isMapLoaded;
    if (locationObject.latitude && locationObject.longitude) {
        mapObject.setCenter(
            {
                lat: locationObject.latitude, // mandatory
                lng: locationObject.longitude, // mandatory
                animated: false // default true
            });
    }

    // TASK 4.3 : MAP, _geoloc attribute and subscribing to collections 

    /*  accounts.subscribe({
         onMessage: (m) => {
             console.dir(m);
             //Add a marker here
         },
         onStatus: (s) => {
             console.dir(s);
         },
         onError: (e) => {
             console.dir(e);
         }
     })
         .then(() => { console.log("subscribtion added") })
         .catch(e => { console.log("error subscribing to collection : " + e) }); */
}
exports.navigateTo = function (args) {
    console.log('HERE');
};
module.exports = new MapPage();