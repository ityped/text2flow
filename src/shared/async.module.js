/**
 * This function:
 * Initializes modules.
 * Configures modules.
 * Runs module hooks.
 * Instantiates modules.
 * 
 * @param {any} configuration 
 * @returns Module Instance
 */
function asyncModule(configuration) {

	/**
	 * @class ModuleInstance
	 *
	 * Factory of modules.
	 * 
	 * @param {any} configuration 
	 * @returns 
	 */
	function ModuleInstance(configuration) {
		var moduleBody = configuration.init();

		var instance = this;

		return (function instantiate(moduleBody) {

			var __system__ = {};
			var self = this;

			this.attach = function(parentModuleInterface) {
				__system__.parentModuleInterface = parentModuleInterface;
				return moduleBody.run();
			};

			this.detach = function() {
				return instance.stop().nextAction(function () {
					__system__.parentModuleInterface.detach(instance);
				});
			};

			this.async = function() {
				return new Future(self.attach.bind(self));
			};

			return this;

		})(moduleBody);
	}

	return new ModuleInstance(configuration).async();
}