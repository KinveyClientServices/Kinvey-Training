/* eslint-disable no-undef */
/* eslint-disable no-alert */
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
const Kinvey = require("kinvey-nativescript-sdk");
const Account = require("./account-model");

function AccountsViewModel(userInfo) {
  const viewModel = observableModule.fromObject({
    accounts: new ObservableArray([]),
    isLoading: false,
    // TASK 3.1: RETRIEVE THE ACCOUNTS LIST
    load: function() {
      this.set("isLoading", true);
      console.log("load");
      /** create a datastore for account with default type */
      /** call the find() method */
      /* .subscribe(
        entities => {
          console.log(`Retrieved : ${entities.length}`);
          this._allAccounts = [];
          entities.forEach(accountData => {
            accountData.id = accountData._id;
            const account = new Account(accountData);
            this._allAccounts.push(account);
          });
          this.set("accounts", new ObservableArray(this._allAccounts));
          this.set("isLoading", false);
        },
        error => {
          console.log(error);
          this.set("isLoading", false);
        },
        () => {
          console.log("pulled accounts");
        }
      );
      */
    }
  });

  return viewModel;
}

module.exports = AccountsViewModel;
