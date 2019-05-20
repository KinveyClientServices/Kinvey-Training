/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const Account = require("./account-model");

function AccountsViewModel(userInfo) {
  const viewModel = observableModule.fromObject({});

  return viewModel;
}

module.exports = AccountsViewModel;
