/**
 * Input options and the output format are documented in the README.
 */
module.exports = function(options) {
	var cwd = options.cwd || process.cwd();

	var readModulesOptions = {
		cwd: cwd,
		babel: options.babel || {},
		sources: options.sources,
		aliases: options.aliases || {},
		fileReader: options.fileReader || require('./dist/utility').readFileFromFileSystem,
		// TODO: Does this deprecate aliases?
		resolveModulePath: options.resolveModulePath || function() {
			return undefined;
		}
	};

	readModulesOptions.aliases.module = readModulesOptions.aliases.module || {};
	readModulesOptions.aliases.path = readModulesOptions.aliases.path || {};

	var readModules = require('./dist/read-modules').readModules;

	return readModules(readModulesOptions).then(function(modules) {
		var analyzeModules = require('./dist/analyze-modules').analyzeModules;

		const analyzeOptions = {
			cwd: cwd,
			modules: modules,
			predefinedModules: options.predefined || {},
			// TODO: Report when these aren't used
			ignoreUnused: options.ignoreUnused || {}
		};

		return analyzeModules(analyzeOptions);
	});
};