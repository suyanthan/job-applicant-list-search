(function(){
	'use strict';
	var express = require('express'),
		router = express.Router(),
		applicantMiddleware = require('../middlewares/applicantProfiles');

	router.get('/profile/:applicantID',applicantMiddleware.viewProfile);

	router.get('/',applicantMiddleware.viewAllApplicants);

	router.get('/search/:?',applicantMiddleware.searchProfile);

	router.use(express.static('./public_html'));

	module.exports = router;
})();