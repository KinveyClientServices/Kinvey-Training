const observableModule = require("tns-core-modules/data/observable");

const SelectedPageService = require("../shared/selected-page-service");

function AppRootViewModel() {
  const viewModel = observableModule.fromObject({
    selectedPage: "",
    activeUserName: "",
    activeUser: ""
  });

  SelectedPageService.getInstance().selectedPage$.subscribe(selectedPage => {
    viewModel.selectedPage = selectedPage;
  });

  return viewModel;
}

module.exports = AppRootViewModel;
