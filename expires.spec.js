"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("./rules/expires");
var RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var span = 345600000;
var now = Date.now();
var testDateForFuture = new Date(now+span).toISOString();

var regex = /(\d{4}-\d{2}-\d{2})(T)(\d{2})(:\d{2})?(:\d{1,2})?(.\d{1,3})?(Z|[+-]\d{2}:\d{2})??$/
var partsOfDate = regex.exec(testDateForFuture);

ruleTester.run("Expires", rule, {
	valid: [
		{ code: "// EXPIRES: "+partsOfDate[1] },
		{ code: "// EXPIRES: "+partsOfDate[1]+partsOfDate[2]+partsOfDate[3]+partsOfDate[4]+partsOfDate[7]},
		{ code: "// EXPIRES: "+partsOfDate[1]+partsOfDate[2]+partsOfDate[3]+partsOfDate[4]+partsOfDate[5]+partsOfDate[7] },
		{ code: "// EXPIRES: "+partsOfDate[1]+partsOfDate[2]+partsOfDate[3]+partsOfDate[4]+partsOfDate[5]+partsOfDate[6]+partsOfDate[7] },
		{ code: "// EXPIRES: "+partsOfDate[1]+partsOfDate[2]+partsOfDate[3]+partsOfDate[4]+partsOfDate[5]+".34"+partsOfDate[7] },
		{ code: "// EXPIRES: "+partsOfDate[1]+partsOfDate[2]+partsOfDate[3]+partsOfDate[4]+"+01:00"},
    { code: "/* EXPIRES: "+partsOfDate[1]+" */" },
    { code: "/* " +
		"* EXPIRES: "+partsOfDate[1]+" " +
		"*/" },
    { code: "/**\n" +
    " * EXPIRES: "+partsOfDate[1]+"\n" +
    " */" },
	],
    invalid: [
    	{ code: "// EXPIRES: 06-04-1990Z", errors: [{ message: "Invalid date!"}] },
    	{ code: "// EXPIRES: 06-04-1990T20Z", errors: [{ message: "Invalid date!"}] },
			{ code: "// EXPIRES: 06-04-1990", errors: [{ message: "Invalid date!"}] },
			{ code: "// EXPIRES: 2015-12-20T02:00", errors: [{ message: "You must define a timezone!"}] },
			{ code: "// EXPIRES: 1992-08-09T02:00Z", errors: [{ message: "Expires date!"}] },
			{ code: "// EXPIRES: 2016-15-16T02:00Z", errors: [{ message: "Invalid date!"}]},
      { code: "/* EXPIRES: 2016-15-16T02:00Z */", errors: [{ message: "Invalid date!"}]},
      { code: "/* EXPIRES: 1992-08-09T02:00Z */", errors: [{ message: "Expires date!"}]},
      { code: "/**\n" +
      " * EXPIRES: 1992-08-09T02:00Z\n" +
      " */", errors: [{ message: "Expires date!"}]},
      { code: "/**\n" +
      " * EXPIRES: 1992-01-01\n" +
			" * TODO: what \n" +
      " */", errors: [{ message: "Expires date!"}]},
    ]
});
