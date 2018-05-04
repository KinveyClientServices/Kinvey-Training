var observableModule = require("data/observable");
var DatePickerModule = require("tns-core-modules/ui/date-picker");

function TaskAddViewModel() {

    var datePicker = new DatePickerModule.DatePicker();
    var viewModel = observableModule.fromObject({
        isLoading: false,
        isComplete: false,
        myAction: "",
        myDueDate: datePicker.date,
        myTaskImage: "res://list"
    });

    return viewModel;
}
module.exports = TaskAddViewModel;
