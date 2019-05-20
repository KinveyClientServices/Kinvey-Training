const app = require("tns-core-modules/application");
const topmost = require("tns-core-modules/ui/frame").topmost;
const TasksViewModel = require("./tasks-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    const viewModel = new TasksViewModel();
    page.bindingContext = viewModel;

    viewModel.load();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

function onTaskItemTap(args) {
    const tappedTaskItem = args.view.bindingContext;
    console.log(args);
    topmost().navigate({
        moduleName: "tasks/task-edit/task-edit-page",
        context: tappedTaskItem,
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
exports.onTaskItemTap = onTaskItemTap;
