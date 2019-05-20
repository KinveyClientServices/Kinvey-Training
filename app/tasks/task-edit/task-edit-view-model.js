const observableModule = require("tns-core-modules/data/observable");
const TaskService = require("../../services/task-service");

function TaskEditViewModel(taskModel) {
    const viewModel = observableModule.fromObject({
        task: observableModule.fromObject(taskModel),
        isUpdating: false,
        _isTaskImageDirty: false,
        _taskService: TaskService.getInstance(),

        save: function () {
            let queue = Promise.resolve();
            this.set("isUpdating", true);

            if (this._isTaskImageDirty && this.task.imageUrl) {
                queue = queue
                    .then(() => {
                        // no need to explicitly delete old image as upload to an existing remote path overwrites it
                        const localFullPath = this.task.imageUrl;
                        const remoteFullPath = this.task.imageStoragePath;

                        return this._taskService.uploadImage(remoteFullPath, localFullPath);
                    })
                    .then((uploadedFile) => {
                        // do not raise property change event here
                        this.task.imageUrl = uploadedFile.url;

                        this._isTaskImageDirty = false;
                    });
            }

            return queue
            .then(() => this._taskService.update(this.task))
            .then(() => this.set("isUpdating", false))
            .catch((errorMessage) => {
                this.set("isUpdating", false);
                throw errorMessage;
            });

        }
    });

    return viewModel;
}

module.exports = TaskEditViewModel;
