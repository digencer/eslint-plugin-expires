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

ruleTester.run("Expires", rule, {
    valid: [
    	{ code: "// EXPIRES: 2216-02-12T22:48:11.457Z" },
    	{ code: "// EXPIRES: 2216-02-12T22:48:11Z" },
    	{ code: "// EXPIRES: 2216-02-12T22:48Z" },
    	{ code: "// EXPIRES: 2216-06-14" },
    	{ code: "// EXPIRES: 2216-03-07T02:00+01:00" },
        { code: "//  EXPIRES: 2216-10-09T02:00Z" },
        { code: "// EXPIRES: 2216-10-09T02:00Z " },
    ],
    invalid: [
    	{ code: "// EXPIRES: 06-04-1990Z", errors: [{ message: "Invalid date!"}] },
    	{ code: "// EXPIRES: 06-04-1990T20Z", errors: [{ message: "Invalid date!"}] },
        { code: "// EXPIRES: 06-04-1990", errors: [{ message: "Invalid date!"}] },
        { code: "// EXPIRES: 2015-12-20T02:00", errors: [{ message: "You must define a timezone!"}] },
        { code: "// EXPIRES: 1992-08-09T02:00Z", errors: [{ message: "eslint/Expires!"}] },
        { code: "// EXPIRES: 2016-15-16T02:00Z", errors: [{ message: "Invalid date!"}]}
    ]
});
