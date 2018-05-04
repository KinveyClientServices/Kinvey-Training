var ObservableClass = require("data/observable");

function AccountsViewModel() {
    var viewModel = ObservableClass.fromObject({
        myItems: null
    });

    return viewModel;
}
module.exports = AccountsViewModel;
