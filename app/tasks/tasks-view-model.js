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
    searchKeyword: "",

    // TASK 3.2: INITIALIZE THE SYNC DATA STORE FOR TASKS COLLECTION
    load: function() {
      console.log("load");
      this.set("isLoading", true);
      /** add a datastore of type sync */
      /** add the find method */
      /* .subscribe(
        entities => {
          console.log(`Retrieved : ${entities.length}`);
          this._allTasks = [];
          entities.forEach(tasksData => {
            tasksData.id = tasksData._id;
            var task = new Task(tasksData);
            this._allTasks.push(task);
          });
          this.set("tasks", new ObservableArray(this._allTasks));
          this.set("isLoading", false);
        },
        error => {
          console.log(error);
          this.set("isLoading", false);
        },
        () => {
          console.log("pulled tasks");
        }
      ); */
    },

    // TASK 3.3: PULL
    pullMe: function() {
      console.log("pullMe");
      /** add the pull method */
      /* .then(numOfRecords => {
          console.log(`Pulled down : ${numOfRecords}`);
        })
        .catch(error => {
          console.log(`Error: ${error}`);
        }); 
      */
    },

    // TASK 3.4: FIND RECORDS AFTER PULL
    refreshMe: function() {
      console.log("refreshMe");
      this.set("isLoading", true);
      /** add the find method */
      /* .subscribe(
        entities => {
          console.log(`Retrieved : ${entities.length}`);
          this._allTasks = [];
          entities.forEach(tasksData => {
            tasksData.id = tasksData._id;
            const task = new Task(tasksData);
            this._allTasks.push(task);
          });
          this.set("tasks", new ObservableArray(this._allTasks));
          this.set("isLoading", false);
        },
        error => {
          console.log(error);
          this.set("isLoading", false);
        },
        () => {
          console.log("pulled tasks");
        }
      ); 
      */
    },

    // TASK 3.7: PUSH
    pushMe: function() {
      console.log("pushMe");
      /** add the push method */
      /* .then(function(entities) {
          console.dir("push succeeded!");
        })
        .catch(function(error) {
          console.log(`Push Failed: ${error}`);
        })
      */
    },

    // TASK 3.8: SYNC
    syncMe: function() {
      console.log("syncMe");
      /** add the sync method */
      /* .then(syncLog => {
          console.dir(syncLog);
        })
        .catch(error => {
          console.log(`Sync Failed: ${error}`);
        });
      */
    },

    // TASK 3.9: QUERY
    loadBySearch: function() {
      this.set("isLoading", true);
      console.log("loadBySearch on " + this.searchKeyword);

      /** build query */

      /** build find with query */

      /* .subscribe(
        entities => {
          console.log(`Retrieved : ${entities.length}`);
          this._allTasks = [];
          entities.forEach(tasksData => {
            tasksData.id = tasksData._id;
            const task = new Task(tasksData);
            this._allTasks.push(task);
          });
          this.set("tasks", new ObservableArray(this._allTasks));
          this.set("isLoading", false);
        },
        error => {},
        () => {
          this.set("isLoading", true);
        }
      );
      */
    }
  });

  return viewModel;
}
module.exports = TasksViewModel;
