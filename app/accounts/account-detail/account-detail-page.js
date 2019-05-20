const app = require("tns-core-modules/application");
const topmost = require("tns-core-modules/ui/frame").topmost;
const AccountDetailViewModel = require("./account-detail-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new AccountDetailViewModel(page.navigationContext);
}

function onBackButtonTap() {
    topmost().goBack();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onBackButtonTap = onBackButtonTap;
