const app = require("tns-core-modules/application");

const LoginViewModel = require("./login-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new LoginViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
