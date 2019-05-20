const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const fs = require("tns-core-modules/file-system");

const editableProperties = [
    "title",
    "action",
    "duedate",
    "completed",
    "imageUrl"
];

function TaskService() {

	if (TaskService._instance) {
		throw new Error("Use TaskService.getInstance() instead of new.");
	}

	this._task = [];
	this._taskStore = Kinvey.DataStore.collection("tasks", Kinvey.DataStoreType.Sync);

	TaskService._instance = this;

	this.update = function (task) {
		const updateModel = cloneUpdateModel(task);

		return this._taskStore.save(updateModel);
	};

	this.uploadImage = function (remoteFullPath, localFullPath) {
		const imageFile = fs.File.fromPath(localFullPath);
		const imageContent = imageFile.readSync();

		const metadata = {
			filename: imageFile.name,
			mimeType: this._getMimeType(imageFile.extension),
			size: imageContent.length,
			public: true
		};

		return Kinvey.Files.upload(imageFile, metadata, { timeout: 2147483647 })
			.then((uploadedFile) => {
				const query = new Kinvey.Query();
				query.equalTo("_id", uploadedFile._id);

				return Kinvey.Files.find(query);
			})
			.then((files) => {
				if (files && files.length) {
					const file = files[0];
					file.url = file._downloadURL;

					return file;
				} else {
					Promise.reject(new Error("No items with the given ID could be found."));
				}
			});
		};
	}

TaskService.getInstance = function () {
    return TaskService._instance;
};

TaskService._instance = new TaskService();

function cloneUpdateModel(task) {
    return editableProperties.reduce((a, e) => (a[e] = task[e], a), { _id: task.id }); // eslint-disable-line no-return-assign, no-sequences
}

module.exports = TaskService;
