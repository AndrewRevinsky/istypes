/**
 * Created by andrew on 4/21/16.
 */
const
  __toString = Object.prototype.toString,
  classNamePattern = /\s+(\w+)]/,
  // eslint-disable-next-line no-void
  sourceTypes = [
    void 0, null, false, 0, '', [], {}, function () { }, /^/, new Date()
  ];

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
export const check = (function() {
  return sourceTypes.concat([ arguments ]).reduce((result, instance) => {
    const originalName = __toString.call(instance);
    const fullName = originalName.replace('DOMWindow', 'Undefined'); // PhantomJS bug
    const shortName = fullName.match(classNamePattern)[1];
    result['is' + shortName] = getTestFor(originalName);
    result['isNot' + shortName] = getNotTestFor(originalName);
    return result;
  }, {});
})();

sourceTypes.splice(0); // release all instances

export default check;

function getType(input) {
  return (__toString.call(input)).replace('DOMWindow', 'Undefined').match(classNamePattern)[1].toLowerCase();
}

export function groupByType(args) {
  if (check.isNotArray(args)) {
    return {};
  }
  return args.reduce((memo, arg) => {
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
