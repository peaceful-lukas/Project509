var log4js = require('log4js'); 

log4js.configure({
	appenders: [
		{ type: 'console' },
		{ type: 'file', filename: 'logs/project509.log', category: 'project509' }
	]
});

var logger = log4js.getLogger('project509');
logger.setLevel('DEBUG');

module.exports = logger;