const app = require("tns-core-modules/application");

const MapViewModel = require("./map-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new MapViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
