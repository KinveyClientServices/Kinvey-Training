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
      this.set("isLoading", true);
      this.dataStore = Kinvey.DataStore.collection(
        "tasks",
        Kinvey.DataStoreType.Sync
      );

      this.dataStore.find().subscribe(
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
      );
    },
    // TASK 3.3: PULL
    pullMe: function() {
      console.log("pullMe");
      this.dataStore
        .pull()
        .then(numOfRecords => {
          console.log(`Pulled down : ${numOfRecords}`);
        })
        .catch(error => {
          console.log(`Error: ${error}`);
        });
    },

    // TASK 3.4: FIND RECORDS AFTER PULL
    refreshMe: function() {
      this.set("isLoading", true);
      this.dataStore.find().subscribe(
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
    },
    // TASK 3.7: PUSH
    pushMe: function() {
      this.dataStore
        .push()
        .then(result => {
          console.log(`Push Success : ${result}`);
        })
        .catch(error => {
          console.log(`Push Failed : ${error}`);
        });
    },
    // TASK 3.8: SYNC
    syncMe: function() {
      this.dataStore
        .sync()
        .then(syncLog => {
          console.dir(syncLog);
        })
        .catch(error => {
          console.log(`Sync Failed: ${error}`);
        });
    },
    // TASK 3.9: QUERY
    loadBySearch: function() {
      this.set("isLoading", true);
      console.log("loadSearchByQuery on " + this.searchKeyword);
      const query = new Kinvey.Query();
      query.matches("action", "^" + this.searchKeyword);
      const subscription = this.dataStore.find(query).subscribe(
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
    }
  });

  return viewModel;
}
module.exports = TasksViewModel;
