(function(){
	var express = require('express'),
		app = express(),
		path = require('path'),
		exphbs  = require('express3-handlebars');

	app.engine('handlebars', 
		exphbs({defaultLayout: 'main'}
	));

	app.set('view engine', 'handlebars');
	app.set('views',path.join(__dirname,'views'));


	app.use('/',require('./controller'));
	app.listen(3000, function () {
		console.log('Please open the browser and visit http://localhost:3000 to view the app.');
	});
})();