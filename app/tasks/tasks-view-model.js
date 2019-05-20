/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const Task = require("./task-model");

function TasksViewModel(userInfo) {
  const viewModel = observableModule.fromObject({});

  return viewModel;
}
module.exports = TasksViewModel;
