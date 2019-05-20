function Task(options) {
    const model = {
        id: options.id,
        title: options.title,
        action: options.action,
        duedate: options.duedate,
        completed: options.completed,
        imageUrl: encodeURI(options.imageUrl)
    };

    return model;
}

module.exports = Task;
