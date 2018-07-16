var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;
var Kinvey = require('kinvey-nativescript-sdk').Kinvey;

var appViewModel = new Observable();
appViewModel.selectedPage = "home";

function BasePage() { }
//SMI: Adding a reference to the Page object
BasePage.prototype.pageObject = "something";
BasePage.prototype.viewModel = appViewModel
BasePage.prototype.pageLoaded = function (args) {

  var page = args.object;
  // console.log(args.object);
  //SMI: Also saving in the prototype variable
  BasePage.prototype.pageObject = args.object;
  page.bindingContext = appViewModel;
}
BasePage.prototype.toggleDrawer = function () {
  topmost().currentPage.getViewById("drawer").toggleDrawerState();
}
BasePage.prototype.navigate = function (args) {
  var pageName = args.view.id.toLowerCase();
  if (pageName == "logout") {
    var activeUser = Kinvey.User.getActiveUser();
    if (activeUser) {
      Kinvey.User.logout()
        .then(function () {
          console.log('logged out');
          topmost().navigate("pages/login/login");
          topmost().currentPage.getViewById("drawer").toggleDrawerState();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  } else {
    appViewModel.set("selectedPage", pageName);
    topmost().navigate("pages/" + pageName + "/" + pageName);
  }

}

BasePage.prototype.toggleActivityIndicator = function (flag, viewModel) {
  if (flag) {
    viewModel.set("isLoading", "true");
  }
  else {
    viewModel.set("isLoading", "false");
  }
}

module.exports = BasePage;