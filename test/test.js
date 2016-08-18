var ApplicantProfile = require('../models/applicantProfile.js'),
    applicant = new ApplicantProfile(),
    sinon = require('sinon'),
    expect = require('chai').expect,
    middlewareApplicant = require('../middlewares/applicantProfiles');

describe("Applicant Profile",function(){
	before(function(){	
  });

	it("Route: View all applicants/home page", function() {
	 var req,res,spy;
	 req = res = {};
	 spy = res.render = sinon.spy();
	 middlewareApplicant.viewAllApplicants(req, res);
	 expect(spy.calledOnce).to.equal(true);
	});  

  it('should return all the applicants with full name (with hyperlink to their individual profile page) and the date applied', function(){
  var viewAllApplicants = applicant.viewApplicants();
    expect(viewAllApplicants).to.equal("<tr><td><a href='/profile/1001'>SUYAN VICKI</a></td><td>10/06/2016</td></tr><tr><td><a href='/profile/1002'>LUXY SUYAN</a></td><td>16/05/2016</td></tr><tr><td><a href='/profile/1003'>YASO RAMES</a></td><td>19/07/2016</td></tr>");
  });

  it('should return the full profile of the applicant 1001', function(){
  	var viewApplicantFullProfile = applicant.viewApplicantProfile(1001)
    	expect(viewApplicantFullProfile[0]).to.equal(true);
    	expect(viewApplicantFullProfile[1]).to.have.all.keys('Applicant Id','Title','Full name','Date of birth','Address','Telephone number','Email address','Work experience');
  	expect(viewApplicantFullProfile[1]['Applicant Id']).to.eql('1001');
  	expect(viewApplicantFullProfile[1].Title).to.eql('MR');
  	expect(viewApplicantFullProfile[1]['Full name']).to.eql('SUYAN VICKI');
  	expect(viewApplicantFullProfile[1]['Date of birth']).to.eql('10/01/1980');
  	expect(viewApplicantFullProfile[1].Address).to.eql('45 QUEEN ROAD, CARSHALTON, SURREY, SM1 1AB');
  	expect(viewApplicantFullProfile[1]['Telephone number']).to.eql('0208 587 4445');
  	expect(viewApplicantFullProfile[1]['Email address']).to.eql('SUYA.VICKI@HOTMAIL.CO.UK');
  	expect(viewApplicantFullProfile[1]['Work experience']).to.eql('I IMPLEMENTED AND MANAGED A FORMAL WORK EXPERIENCE PROGRAMME AT MY LAST COMPANY. AS A RESULT, WE ATTRACTED YOUNG TALENT AND FOUND NEW RECRUITS FOR JUNIOR ROLES WHICH SAVED THE COMPANY THE HIGH COSTS OF ADVERTISING AND WIDE INTERVIEWING. THE SCHEME GAVE YOUNG PEOPLE THE EXPERIENCE TO HELP THEM MAKE CAREER CHOICES AND IMPROVE THEIR CVS WHILE PROVIDING US WITH GOOD QUALITY WORK AT A VERY LOW COST. I USED MY ORGANISATIONAL SKILLS TO PLAN A BUSY SUMMER PLACEMENTS SCHEDULE AND PUT TOGETHER A WELCOME PACK TO MAKE SURE THE INDIVIDUALS WERE WELL-LOOKED AFTER AND TO PROMOTE THE BENEFITS OF THE COMPANY TO THEM.');
  });

  it('should not return full profile of an invalid applicant id 10099', function(){
  var viewApplicantFullProfile = applicant.viewApplicantProfile(10099)
    expect(viewApplicantFullProfile[0]).to.equal(false);
    expect(viewApplicantFullProfile[1]).to.have.lengthOf(50);
  });

  it('should not return full profile of an invalid applicant id 10099', function(){
  var viewApplicantFullProfile = applicant.viewApplicantProfile(10099)
    expect(viewApplicantFullProfile[0]).to.equal(false);
    expect(viewApplicantFullProfile[1]).to.have.lengthOf(50);
  });

  it('should return applicant full profile when searched by their ID 1002', function(){
  	var searchApplicantID = applicant.searchApplicantProfile(1002)
    expect(searchApplicantID).to.equal("1002");
  	var viewApplicantFullProfile = applicant.viewApplicantProfile(searchApplicantID)
    expect(viewApplicantFullProfile[0]).to.equal(true);
    expect(viewApplicantFullProfile[1]).to.have.all.keys('Applicant Id','Title','Full name','Date of birth','Address','Telephone number','Email address','Work experience');
  	expect(viewApplicantFullProfile[1]['Applicant Id']).to.eql('1002');
  	expect(viewApplicantFullProfile[1].Title).to.eql('MRS');
  	expect(viewApplicantFullProfile[1]['Full name']).to.eql('LUXY SUYAN');
  	expect(viewApplicantFullProfile[1]['Date of birth']).to.eql('28/01/1979');
  	expect(viewApplicantFullProfile[1].Address).to.eql('40A MARTIN WAY, MORDEN, SURREY, SM1 1CX');
  	expect(viewApplicantFullProfile[1]['Telephone number']).to.eql('0208 547 5544');
  	expect(viewApplicantFullProfile[1]['Email address']).to.eql('LUXY@HOTMAIL.COM');
  	expect(viewApplicantFullProfile[1]['Work experience']).to.eql('ASSISTED THE ONLY IT MANAGER WITH CREATING A NEW COMPANY WEBSITE, AS WELL AS COMPLETELY UPDATING THE OLD ONE. CREATED BANNERS/BROCHURES ETC FOR ADVERTISING AT PROMOTIONAL EVENTS. BASIC ADMIN DUTIES - ANSWERING EMAILS, UPDATING THE DATABASE, ANSWERING THE PHONE.');
  });

  it('should return applicant full profile when searched by their name luxy suyan', function(){
  	var searchApplicantID = applicant.searchApplicantProfile("LUXY SUYAN")
    expect(searchApplicantID).to.equal("1002");
  	var viewApplicantFullProfile = applicant.viewApplicantProfile(searchApplicantID)
    expect(viewApplicantFullProfile[0]).to.equal(true);
    expect(viewApplicantFullProfile[1]).to.have.all.keys('Applicant Id','Title','Full name','Date of birth','Address','Telephone number','Email address','Work experience');
  	expect(viewApplicantFullProfile[1]['Applicant Id']).to.eql('1002');
    expect(viewApplicantFullProfile[1].Title).to.eql('MRS');
    expect(viewApplicantFullProfile[1]['Full name']).to.eql('LUXY SUYAN');
    expect(viewApplicantFullProfile[1]['Date of birth']).to.eql('28/01/1979');
    expect(viewApplicantFullProfile[1].Address).to.eql('40A MARTIN WAY, MORDEN, SURREY, SM1 1CX');
    expect(viewApplicantFullProfile[1]['Telephone number']).to.eql('0208 547 5544');
    expect(viewApplicantFullProfile[1]['Email address']).to.eql('LUXY@HOTMAIL.COM');
    expect(viewApplicantFullProfile[1]['Work experience']).to.eql('ASSISTED THE ONLY IT MANAGER WITH CREATING A NEW COMPANY WEBSITE, AS WELL AS COMPLETELY UPDATING THE OLD ONE. CREATED BANNERS/BROCHURES ETC FOR ADVERTISING AT PROMOTIONAL EVENTS. BASIC ADMIN DUTIES - ANSWERING EMAILS, UPDATING THE DATABASE, ANSWERING THE PHONE.');
  });

});


