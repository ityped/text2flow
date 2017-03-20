
function TestFutureModuleTemplate(settings) {
	var self = this;
	var presentValue = null;
	var configuration = settings;

	this.init = function () {
		presentValue = configuration.inputValue * 2;
		return {
			run: function () {
				this.future = Future;
				this.futureValue = new Future(function () {
					return presentValue * 2;
				}).nextAction(function (value) {
					configuration.__test__.sandbox.dom.innerHTML = value;
				});
				this.sandbox = settings.__test__.sandbox.dom;
				return this;
			}
		};
	};

	return this;
}

asyncModule(new TestFutureModuleTemplate({
	__test__: window.__test__,
	inputValue: 1
})).nextAction(function (module) {
	module.futureValue.nextAction(function (value) {
		var span = document.createElement("span");
		span.innerHTML = " checked " + value;
		module.sandbox.appendChild(span);
	});
});
