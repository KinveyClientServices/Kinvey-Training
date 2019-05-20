/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const Account = require("./account-model");

function AccountsViewModel(userInfo) {
  const viewModel = observableModule.fromObject({
    accounts: new ObservableArray([]),
    isLoading: false
    // TASK 3.1: RETRIEVE THE ACCOUNTS LIST
  });

  return viewModel;
}

module.exports = AccountsViewModel;
