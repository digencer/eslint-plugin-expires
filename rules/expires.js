"use strict";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function(context) {
  var tag = "EXPIRES";
  var INVALID_TIME_ERROR = "Invalid date!";
  var TIMEZONE_ERROR = "You must define a timezone!";
  var EXPIRED_ERROR = "Date expired!";
  var CURRENT_ERROR = null;
  var expiredAsMilliseconds = 0;

  function trimAllSpacesAndStars(str) {
    return str.replace(/\*/g, "") // remove astricks
      .replace(/^\s+|\s+$/g, ""); // remove all white space including new lines
  }

  function checkCommentValidity(node) {
    var value = trimAllSpacesAndStars(node.value);
    if (value.length === 0) {
      return false;
    } else if (value.split(": ")[0] !== tag) {
      return false;
    }
    return true;
  }

  function getExpireDateValidity(node) {
    var value = trimAllSpacesAndStars(node.value);
    var expiredDatePlus = value.split(": ")[1];
    var expiredDate = expiredDatePlus.match(/(^\S*)/)[0]; // take all before first space or new line
    var isValidDate = /(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}?(:\d{1,2})?(.\d{1,3})?(Z|[+-]\d{2}:\d{2})?)?$/.exec(expiredDate);

    if (isValidDate === null) {
      CURRENT_ERROR = INVALID_TIME_ERROR;
      return false;
    } else if (isValidDate[2] !== undefined && isValidDate[5] === undefined) { // eslint-disable-line no-undefined
      CURRENT_ERROR = TIMEZONE_ERROR;
      return false;
    }
    expiredAsMilliseconds = Date.parse(expiredDate);
    if (isNaN(expiredAsMilliseconds)) {
      CURRENT_ERROR = INVALID_TIME_ERROR;
      return false;
    }
    return true;
  }

  function displayError(node, reason) {
    context.report(node, reason);
  }

  function checkForExpires(node) {
    if (checkCommentValidity(node) && getExpireDateValidity(node)) {
      var currentTime = Date.now();
      if (expiredAsMilliseconds <= currentTime) {
        displayError(node, EXPIRED_ERROR);
      }
    } else if (CURRENT_ERROR !== null) {
      displayError(node, CURRENT_ERROR);
    }
  }

  return {
    LineComment: checkForExpires,
    BlockComment: checkForExpires
  };
};

module.exports.schema = [];
