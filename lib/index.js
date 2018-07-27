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
  sourceTypes = [void 0, null, false, 0, '', [], {}, function () {}, /^/, new Date()];

  try {
    return sourceTypes.concat([arguments], args).reduce(function (result, instance) {
      var originalName = __toString.call(instance);

      var fullName = originalName.replace('DOMWindow', 'Undefined'); // PhantomJS bug

      var shortName = fullName.match(classNamePattern)[1];
      result['is' + shortName] = getTestFor(originalName);
      result['isNot' + shortName] = getNotTestFor(originalName);
      return result;
    }, {
      getType: getType
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