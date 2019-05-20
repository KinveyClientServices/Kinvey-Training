const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const DatePickerModule = require("tns-core-modules/ui/date-picker");

function TaskAddViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("TaskAdd");
    const datePicker = new DatePickerModule.DatePicker();

    const viewModel = observableModule.fromObject({
        title: "",
        action: "",
        duedate: datePicker.date,
        completed: false,
        imageUrl: "res://menu",
        isUpdating: false,
        _isTaskImageDirty: false
    });

    return viewModel;
}

module.exports = TaskAddViewModel;
