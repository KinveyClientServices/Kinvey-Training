/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const dialogsModule = require("tns-core-modules/ui/dialogs");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const topmost = require("tns-core-modules/ui/frame").topmost;

function LoginViewModel() {
  const viewModel = observableModule.fromObject({});

  return viewModel;
}

module.exports = LoginViewModel;
