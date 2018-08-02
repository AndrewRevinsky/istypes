/**
 * Created by andrew on 4/21/16.
 */
const
  __toString = Object.prototype.toString,
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
const checksGen = function(...args) {
  const // eslint-disable-next-line no-void
    sourceTypes = [
      void 0, null, false, 0, '', [], {}, function () { }, /^/, new Date()
    ];
  try {
    return sourceTypes.concat([ arguments ], args).reduce((api, instance) => {
      const originalName = __toString.call(instance);
      const fullName = originalName.replace('DOMWindow', 'Undefined'); // PhantomJS bug
      const shortName = fullName.match(classNamePattern)[1];
      api['is' + shortName] = getTestFor(originalName);
      api['isNot' + shortName] = getNotTestFor(originalName);
      return api;
    }, {
      getType,
      isPrimitive,
      isNotPrimitive,
      isIterable,
      isNotIterable,
      isArrayLike,
      isNotArrayLike
    });
  } catch (_) {} finally {
    sourceTypes.splice(0)
  }
};
const defaultChecks = checksGen();

export const check = Object.assign(checksGen, defaultChecks);

export default defaultChecks;

function getType(test) {
  return (__toString.call(test)).replace('DOMWindow', 'Undefined').match(classNamePattern)[1].toLowerCase();
}

function isPrimitive(test) {
  return (test !== Object(test));
}
function isNotPrimitive(test) {
  return (test === Object(test));
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

export function groupByType(arraylike) {
  if (isNotArrayLike(arraylike)) {
    return {};
  }
  return Array.from(arraylike).reduce((memo, arg) => {
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
