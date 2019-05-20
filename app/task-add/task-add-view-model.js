const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const DatePickerModule = require("tns-core-modules/ui/date-picker");

function TaskAddViewModel() {
  SelectedPageService.getInstance().updateSelectedPage("TaskAdd");
  const datePicker = new DatePickerModule.DatePicker();

  const viewModel = observableModule.fromObject({});

  return viewModel;
}

module.exports = TaskAddViewModel;
