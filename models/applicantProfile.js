(function(){
	'use strict';
	var JsonDB = require('../node_modules/node-json-db'),
		db = new JsonDB("./database/applicantDataBase", true, false),
		simpleJSONFilter = require("../node_modules/simple-json-filter/index.js"),
		sjf = new simpleJSONFilter(),
		profileData,
		isProfileExist,
		searchProfiles,
		searchResult;

	 function ApplicantProfile(){
	 }

	ApplicantProfile.prototype = {
		//constructor: ApplicantProfile,
		viewApplicantProfile: function(applicantID){
			try {
				profileData = db.getData("/"+applicantID);
				isProfileExist = true;
			} catch(error) {
				profileData = "Profile of this applicant ("+applicantID+") does not exists."
		    	isProfileExist = false;
			}
			return [isProfileExist, profileData];
		},

		searchApplicantProfile: function(searchQuery){
				profileData = db.getData("/");
				searchProfiles = {"Full name": searchQuery};
				searchResult = sjf.exec(searchProfiles, profileData);
				if(Object.getOwnPropertyNames(searchResult).length === 0){
					searchProfiles = {"Applicant Id": searchQuery};
					searchResult = sjf.exec(searchProfiles, profileData);
				}
				if(Object.getOwnPropertyNames(searchResult).length !== 0){
					return Object.keys(searchResult).toString();
				}else{
					return false;
				}
		},

		viewApplicants: function(){
			profileData = db.getData("/");
			var applicantSummary = "";
			profileData.ApplicantSummery.forEach(function(item){
				applicantSummary += "<tr>";
				applicantSummary += "<td><a href='/profile/"+item.ApplicantID+"'>"+item.FullName+"</a></td>";
				applicantSummary += "<td>"+item.AppliedDate+"</td>";
				applicantSummary += "</tr>";
			});
			return applicantSummary;
		}
	}

	module.exports = ApplicantProfile;

})();