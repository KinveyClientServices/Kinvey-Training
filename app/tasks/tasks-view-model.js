/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const Task = require("./task-model");

function TasksViewModel(userInfo) {
  const viewModel = observableModule.fromObject({
    tasks: new ObservableArray([]),
    isLoading: false,
    dataStore: null,
    searchKeyword: ""
    // TASK 3.2: INITIALIZE THE SYNC DATA STORE FOR TASKS COLLECTION

    // TASK 3.3: PULL

    // TASK 3.4: FIND RECORDS AFTER PULL

    // TASK 3.7: PUSH

    // TASK 3.8: SYNC

    // TASK 3.9: QUERY
  });

  return viewModel;
}
module.exports = TasksViewModel;
