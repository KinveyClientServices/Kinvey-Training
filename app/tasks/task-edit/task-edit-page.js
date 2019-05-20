/* eslint-disable no-undef */
/* eslint-disable no-alert */
const app = require("tns-core-modules/application");
const topmost = require("tns-core-modules/ui/frame").topmost;
const TaskEditViewModel = require("./task-edit-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new TaskEditViewModel(page.navigationContext);
}

function onBackButtonTap() {
    topmost().goBack();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onSubmitTaskTap(args) {
    const actionItem = args.object;
    const bindingContext = actionItem.bindingContext;

    bindingContext.save()
        .then(() => topmost().goBack())
        .catch((error) =>
            alert({
                title: "Save Error!",
                message: error,
                okButtonText: "Ok"
            }));
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onBackButtonTap = onBackButtonTap;

exports.onSubmitTaskTap = onSubmitTaskTap;
