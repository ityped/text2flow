var future = new Future(function () {
	return 1;
});

var testSandboxDOM = window.__test__.sandbox.dom;

future.nextAction(function (value) {
	testSandboxDOM.innerHTML = value;
}).nextAction(function (value) {
	testSandboxDOM.innerHTML = value;
});