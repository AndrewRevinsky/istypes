"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByType = groupByType;
exports.default = exports.check = void 0;

/**
 * Created by andrew on 4/21/16.
 */
var __toString = Object.prototype.toString,
    classNamePattern = /\s+(\w+)]/;
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

var checksGen = function checksGen() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var // eslint-disable-next-line no-void
  sourceTypes = [void 0, null, false, 0, '', [], {}, function () {}, /^/, new Date(), function () {
    try {
      return new Map();
    } catch (_) {}
  }(), function () {
    try {
      return new Set();
    } catch (_) {}
  }(), function () {
    try {
      return new Error('');
    } catch (_) {}
  }(), function () {
    try {
      return Symbol('');
    } catch (_) {}
  }()];

  try {
    return sourceTypes.concat([arguments], args).reduce(function (api, instance) {
      var originalName = __toString.call(instance);

      var fullName = originalName.replace('DOMWindow', 'Undefined'); // PhantomJS bug

      var shortName = fullName.match(classNamePattern)[1];
      api['is' + shortName] = getTestFor(originalName);
      api['isNot' + shortName] = getNotTestFor(originalName);
      return api;
    }, {
      getType: getType,
      isPrimitive: isPrimitive,
      isNotPrimitive: isNotPrimitive,
      isIterable: isIterable,
      isNotIterable: isNotIterable,
      isArrayLike: isArrayLike,
      isNotArrayLike: isNotArrayLike
    });
  } catch (_) {} finally {
    sourceTypes.splice(0);
  }
};

var defaultChecks = checksGen();
var check = Object.assign(checksGen, defaultChecks);
exports.check = check;
var _default = defaultChecks;
exports.default = _default;

function getType(test) {
  return __toString.call(test).replace('DOMWindow', 'Undefined').match(classNamePattern)[1].toLowerCase();
}

function isPrimitive(test) {
  return test !== Object(test);
}

function isNotPrimitive(test) {
  return test === Object(test);
}

function isIterable(test) {
  return defaultChecks.isNotUndefined(test) && defaultChecks.isNotNull(test) && defaultChecks.isFunction(test[Symbol.iterator]);
}

function isNotIterable(test) {
  return defaultChecks.isUndefined(test) || defaultChecks.isNull(test) || defaultChecks.isNotFunction(test[Symbol.iterator]);
}

function isArrayLike(test) {
  return isNotPrimitive(test) && defaultChecks.isNotUndefined(test.length) && defaultChecks.isNotFunction(test);
}

function isNotArrayLike(test) {
  return isPrimitive(test) || defaultChecks.isUndefined(test.length) || defaultChecks.isFunction(test);
}

function groupByType(arraylike) {
  if (isNotArrayLike(arraylike)) {
    return {};
  }

  return Array.from(arraylike).reduce(function (memo, arg) {
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