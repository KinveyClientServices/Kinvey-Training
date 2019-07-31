/* eslint-disable no-undef */
/* eslint-disable no-alert */
const application = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const Kinvey = require("kinvey-nativescript-sdk");

const AppRootViewModel = require("./app-root-view-model");

function onLoaded(args) {
  const drawerComponent = args.object;
  drawerComponent.bindingContext = new AppRootViewModel();
}

function onNavigationItemTap(args) {
  const component = args.object;
  const componentRoute = component.route;
  const componentTitle = component.title;
  const bindingContext = component.bindingContext;

  bindingContext.set("selectedPage", componentTitle);

  const activeUser = Kinvey.User.getActiveUser();
  if (activeUser && activeUser.username) {
    bindingContext.set("activeUser", activeUser.username);
    bindingContext.set("activeUserName", activeUser.name);
  } else {
    bindingContext.set("activeUser", "No User");
  }
  if (componentTitle === "Logoff") {
    if (activeUser !== null) {
      Kinvey.User.logout()
        .then(() => {
          console.log(`user logged out: ${JSON.stringify(activeUser)}`);
        })
        .catch(error => {
          alert("An error occurred. Check your Kinvey settings.");
          console.log(`error: ${error}`);
        });
    } else {
      console.log("user not logged in.");
    }
  }

  frameModule.topmost().navigate({
    moduleName: componentRoute,
    transition: {
      name: "fade"
    }
  });

  const drawerComponent = application.getRootView();
  drawerComponent.closeDrawer();
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;
