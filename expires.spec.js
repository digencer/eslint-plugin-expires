"use strict";

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require("./rules/expires");
var RuleTester = require("eslint").RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();

var span = 10 * 24 * 60 * 60 * 1000;
var now = Date.now();
var testDateForFuture = new Date(now + span).toISOString();

var DATE_REGEX = /(\d{4}-\d{2}-\d{2})(T)(\d{2})(:\d{2})?(:\d{1,2})?(.\d{1,3})?(Z|[+-]\d{2}:\d{2})??$/;

var partsOfDate = DATE_REGEX.exec(testDateForFuture);
var date = partsOfDate[1];
var t = partsOfDate[2];
var hour = partsOfDate[3];
var minute = partsOfDate[4];
var second = partsOfDate[5];
var milliseconds = partsOfDate[6];
var timezone = partsOfDate[7];

// Error types
var INVALID_TIME_ERROR = "Invalid date!";
var TIMEZONE_ERROR = "You must define a timezone!";
var EXPIRED_ERROR = "Date expired!";

ruleTester.run("Expires", rule, {
  valid: [
		{code: "// EXPIRES: " + date},
		{code: "// EXPIRES: " + date + t + hour + minute + timezone},
		{code: "// EXPIRES: " + date + t + hour + minute + second + timezone},
		{code: "// EXPIRES: " + date + t + hour + minute + second + milliseconds + timezone},
		{code: "// EXPIRES: " + date + t + hour + minute + second + ".34" + timezone},
		{code: "// EXPIRES: " + date + t + hour + minute + "+01:00"},
    {code: "/* EXPIRES: " + date + " */"},
    {code: "/* " +
		"* EXPIRES: " + date + " " +
		"*/"},
    {code: "/**\n" +
    " * EXPIRES: " + date + "\n" +
    " */"}
  ],
  invalid: [
    {code: "// EXPIRES: 06-04-1990Z", errors: [{message: INVALID_TIME_ERROR}]},
    {code: "// EXPIRES: 06-04-1990T20Z", errors: [{message: INVALID_TIME_ERROR}]},
    {code: "// EXPIRES: 06-04-1990", errors: [{message: INVALID_TIME_ERROR}]},
    {code: "// EXPIRES: 2015-12-20T02:00", errors: [{message: TIMEZONE_ERROR}]},
    {code: "// EXPIRES: 1992-08-09T02:00Z", errors: [{message: EXPIRED_ERROR}]},
    {code: "// EXPIRES: 2016-15-16T02:00Z", errors: [{message: INVALID_TIME_ERROR}]},
    {code: "/* EXPIRES: 2016-15-16T02:00Z */", errors: [{message: INVALID_TIME_ERROR}]},
    {code: "/* EXPIRES: 1992-08-09T02:00Z */", errors: [{message: EXPIRED_ERROR}]},
    {code: "/**\n" +
    " * EXPIRES: 1992-08-09T02:00Z\n" +
    " */", errors: [{message: EXPIRED_ERROR}]},
    {code: "/**\n" +
    " * EXPIRES: 1992-01-01\n" +
    " * TODO: what \n" +
    " */", errors: [{message: EXPIRED_ERROR}]}
  ]
});
