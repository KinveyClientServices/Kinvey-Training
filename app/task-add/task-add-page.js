/* eslint-disable no-undef */
/* eslint-disable no-alert */
const app = require("tns-core-modules/application");
const topmost = require("tns-core-modules/ui/frame").topmost;
const TaskAddViewModel = require("./task-add-view-model");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new TaskAddViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onAddTaskTap(args) {
    const actionItem = args.object;
    const bindingContext = actionItem.bindingContext;
    // TASK 3.5: SAVE THE TASK
    const dataStore = Kinvey.DataStore.collection("tasks", Kinvey.DataStoreType.Sync);
    const entity = {
        title: bindingContext.get("title"),
        action: bindingContext.get("action"),
        duedate: bindingContext.get("duedate").toString(),
        completed: bindingContext.get("completed"),
        title: bindingContext.get("title"),
        imageUrl: bindingContext.get("imageUrl")
    };
    dataStore.save(entity)
    .then((returnedEntity) => {
        console.log("Task Added Successfully");
        topmost().navigate({
            moduleName: "tasks/tasks-page",
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    })
    .catch((error) => {
        console.log(error);
        alert({
            title: "Save Error!",
            message: error,
            okButtonText: "Ok"
        });
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onAddTaskTap = onAddTaskTap;
