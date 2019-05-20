const app = require("tns-core-modules/application");
const topmost = require("tns-core-modules/ui/frame").topmost;
const AccountsViewModel = require("./accounts-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new AccountsViewModel();
    page.bindingContext = viewModel;

    viewModel.load();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onAccountItemTap(args) {
    const tappedAccountItem = args.view.bindingContext;

    topmost().navigate({
        moduleName: "accounts/account-detail/account-detail-page",
        context: tappedAccountItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onAccountItemTap = onAccountItemTap;
