(function(){
	'use strict';
	var ApplicantProfile = require('../models/applicantProfile'),
		viewApplicantProfile,
		applicant;

	applicant = new ApplicantProfile();

	exports.viewProfile = function(req, res){
		viewApplicantProfile = applicant.viewApplicantProfile(req.params.applicantID);
		res.render('viewProfile',{
			applicantData:viewApplicantProfile[1],
			applicantProfileExist:viewApplicantProfile[0],
			breadcrumHome: false,
			breadcrumSearch: false,
			breadcrumProfile:true
		});
	}

	exports.viewAllApplicants = function(req, res){
		var viewAllApplicant = applicant.viewApplicants();
		res.render('index',{
			applicantSummary: viewAllApplicant,
			breadcrumHome: true,
			breadcrumProfile:false,
			breadcrumSearch: false
		});
	}

	exports.searchProfile = function(req, res){
		var applicantSearchQuery = req.query.q,
			searchResult,
			searchApplicant,
			searchResultMsg,
			isSearchValid;
		applicantSearchQuery = applicantSearchQuery.toString().trim().toUpperCase();
		if(applicantSearchQuery === ""){
			searchResult = "QueryEmpty";
		}else{
			searchApplicant = applicant.searchApplicantProfile(applicantSearchQuery);
			if(searchApplicant !== false){
				searchResult = "ResultFound";
				viewApplicantProfile = applicant.viewApplicantProfile(searchApplicant);
			}else{
				searchResult = "NoResult"
			}
		}
		switch(searchResult){
			case "QueryEmpty":
				isSearchValid=false;
				searchResultMsg="Please enter applicant Id or their full name.";
			break;
			case "NoResult":
				isSearchValid=false;
				searchResultMsg="0 result found.";
			break;
			case "ResultFound":
				searchResultMsg=viewApplicantProfile[1],
				isSearchValid=viewApplicantProfile[0];
		}
		res.render('search',{
			applicantData:searchResultMsg,
			applicantProfileExist:isSearchValid,
			breadcrumSearch: true,
			breadcrumProfile:false,
			breadcrumHome: false
		});
	}
})();