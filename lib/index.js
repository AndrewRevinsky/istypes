'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByType = groupByType;
/**
 * Created by andrew on 4/21/16.
 */
var __toString = Object.prototype.toString,
    classNamePattern = /\s+(\w+)]/,

// eslint-disable-next-line no-void
sourceTypes = [void 0, null, false, 0, '', [], {}, function () {}, /^/, new Date()];

/**
 *
 * @type {{
 *  isUndefined(*), isNotUndefined(*),
 *  isNull(*),  isNotNull(*),
 *  isBoolean(*), isNotBoolean(*),
 *  isNumber(*), isNotNumber(*),
 *  isString(*), isNotString(*),
 *  isArray(*), isNotArray(*),
 *  isObject(*), isNotObject(*),
 *  isFunction(*), isNotFunction(*),
 *  isArguments(*), isNotArguments(*),
 *  isRegExp(*), isNotRegExp(*),
 *  isDate(*), isNotDate(*)
 * }}
 */
var check = exports.check = function () {
  return sourceTypes.concat([arguments]).reduce(function (result, instance) {
    var originalName = __toString.call(instance);
    var fullName = originalName.replace('DOMWindow', 'Undefined'); // PhantomJS bug
    var shortName = fullName.match(classNamePattern)[1];
    result['is' + shortName] = getTestFor(originalName);
    result['isNot' + shortName] = getNotTestFor(originalName);
    return result;
  }, {});
}();

sourceTypes.splice(0); // release all instances

exports.default = check;


function getType(input) {
  return __toString.call(input).replace('DOMWindow', 'Undefined').match(classNamePattern)[1].toLowerCase();
}

function groupByType(args) {
  if (check.isNotArray(args)) {
    return {};
  }
  return args.reduce(function (memo, arg) {
    memo[getType(arg)] = arg;
    return memo;
  }, {});
}

function getTestFor(fullName) {
  return function (val) {
    return __toString.call(val) === fullName;
  };
}

function getNotTestFor(fullName) {
  return function (val) {
    return __toString.call(val) !== fullName;
  };
}