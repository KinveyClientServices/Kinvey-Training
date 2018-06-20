var DatePickerModule = require("tns-core-modules/ui/date-picker/date-picker");
var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var view = require("ui/core/view");
var Observable = require("data/observable").Observable;
var observableArray = require("data/observable-array");
var observable = require("data/observable");
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var imageSource = require("image-source");
var fs = require("file-system");
var enums = require("ui/enums");
var activityIndicator = require("tns-core-modules/ui/activity-indicator");
var TaskAddViewModel = require("./taskadd-view-model");

var viewModel = new TaskAddViewModel();
var TaskAddPage = function () {

};
TaskAddPage.prototype = new BasePage();
TaskAddPage.prototype.constructor = TaskAddPage;
var myImage; //If a user chooses a camera image the source is saved in this var. See picMe method.
var page;
// Place any code you want to run when the home page loads here.
TaskAddPage.prototype.contentLoaded = function (args) {
    console.log('tasks add content loaded');
    page = args.object;
    page.bindingContext = viewModel;
};
TaskAddPage.prototype.taskSubmit = function (args) {
    console.log('submitting task');
    console.log(viewModel.get("isComplete"));
    //Show the spinner
    viewModel.set("isLoading", true);
    //Retrieve the imageSource if there was an image selcted
    if (myImage) {
        /* Step 1: Save the image locally */
        const folder = fs.knownFolders.documents();
        var random = Math.floor(Math.random() * 100000) + 1;
        const filename = "task" + random + ".png";
        const path = fs.path.join(folder.path, filename);
        const saved = myImage.saveToFile(path, "png");
        //Upload method works with fs.File.
        var file = fs.File.fromPath(path);
        var metadata = {
            filename: filename,
            mimeType: 'image/png',
            size: file.readSync().length
        };
        /*  Step 2 Upload the image. */
        var promise = Kinvey.Files.upload(file, metadata)
            .then(function (file) {
                console.log(file);
                //Now retrieve the image from the server.
                var promise = Kinvey.Files.stream(file._id)
                    .then(function (file) {
                        /*  Step 3: Save the task */
                        var entity = {
                            action: viewModel.get("myAction"),
                            duedate: viewModel.get("myDueDate").toString(),
                            completed: viewModel.get("isComplete"),
                            title: "Personal Task",
                            imageUrl: file._downloadURL
                        }
                        saveTask(entity);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        //Just save the task. No image selected
        var entity = {
            action: viewModel.get("myAction"),
            duedate: viewModel.get("myDueDate").toString(),
            completed: viewModel.get("isComplete"),
            title: "Personal Task",
            imageUrl: ""
        }
        saveTask(entity);
    }

}

saveTask = function (entity) {
    console.dir(entity);
    //Now upload the task

    //TASK 3.3: SAVE THE ENTITY IN TASKS USING THE SYNC STORE

    /*  .then(function (entity) {
         console.log(entity);
         resetViewModel();
         alert("Task Added Succesfully");
     })
     .catch(function (error) {
         console.log(error);
     }); */
}

resetViewModel = function () {
    viewModel.set("isComplete", false);
    viewModel.set("myAction", "");
    viewModel.set("myDueDate", new Date());
    viewModel.set("myTaskImage", viewModel.set("myTaskImage", "res://list"));
    //Hide spinner
    viewModel.set("isLoading", false);
}


TaskAddPage.prototype.onPageLoaded = function (args) {
    console.log('task add page loaded');
    //TaskAddPage.prototype.toggleActivityIndicator(true, viewModel);
    //viewModel.set("isLoading", "true");

};

TaskAddPage.prototype.picMe = function (args) {
    console.log('take picture');
    camera.requestPermissions();
    var options = { saveToGallery: true };
    camera.takePicture(options)
        .then(function (imageAsset) {
            imageSource.fromAsset(imageAsset).then((res) => {
                //First applying the image to the template
                taskImg = page.getViewById('taskImage');
                taskImg.imageSource = res;
                myImage = taskImg.imageSource;

            });
            console.log("image selected");
        });

    /*}).catch(function (err) {
        console.log("Error -> " + err.message);
    });*/

};



exports.navigateTo = function (args) {
    console.log('task add navigateTo loaded');
};

module.exports = new TaskAddPage();
//exports.onPageLoad = onPageLoaded;