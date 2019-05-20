const observableModule = require("tns-core-modules/data/observable");

function AccountDetailViewModel(accountModel) {

    const viewModel = observableModule.fromObject({
        account: accountModel
    });

    return viewModel;
}

module.exports = AccountDetailViewModel;
