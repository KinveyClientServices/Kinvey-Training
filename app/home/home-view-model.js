const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function HomeViewModel(userInfo) {
  SelectedPageService.getInstance().updateSelectedPage("Home");
  if (!userInfo) {
    userInfo = "No User";
  }
  const viewModel = observableModule.fromObject({
    loggedUser: userInfo,
    _navigateLogin: function(user) {
      topmost().navigate({
        moduleName: "login/login-page",
        animated: true,
        transition: {
          name: "slideTop",
          duration: 350,
          curve: "ease"
        }
      });
    }
  });

  return viewModel;
}

module.exports = HomeViewModel;
