function Future(ISync) {

	var value = null;
	var future = this;
	var handlers = [];

	this.nextAction = function (handler) {
		handlers.push(handler);
		return future;
	};

	window.setTimeout(function () {
		value = ISync();
		handlers.forEach(function (handler) {
			handler(value);
		});
	}, 1);

	return this;
}
