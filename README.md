# istypes

[![NPM](https://nodei.co/npm/istypes.png?downloads=true&stars=true)](https://nodei.co/npm/istypes/)

`istypes` is a library that allows type-checking of javascript instances and also a way to group a list of items by type.

## Installation

```bash
$ npm install --save istypes
```

or

```bash
$ yarn add istypes
```

## Usage

### Type checking API:

_All samples are included in tests to guarantee their validity_

```es6

import { check } from 'istypes';

// positives
check.isUndefined(undefined) // true
check.isNull(null) // true
check.isBoolean(true)  // true
check.isNumber(0)  // true
check.isNumber(parseInt('x')) // true (NaN is a number)
check.isNumber(1 / 0)  // true (+Infinity is a number)
check.isString('') // true
check.isArray([])  // true
check.isObject({}) // true
check.isFunction(() => {}) // true
(function () {
    check.isArguments(arguments) // true
})()
check.isRegExp(/.*/)     // true
check.isDate(new Date()) // true

// negatives
check.isNotUndefined(undefined) // false
check.isNotNull(null) // false
check.isNotBoolean(true)  // false
check.isNotNumber(0)  // false
check.isNotNumber(parseInt('x')) // false (NaN is a number)
check.isNotNumber(1 / 0)  // false (+Infinity is a number)
check.isNotString('') // false
check.isNotArray([])  // false
check.isNotObject({}) // false
check.isNotFunction(() => {}) // false
(function () {
    check.isNotArguments(arguments) // false
})()
check.isNotRegExp(/.*/)     // false
check.isNotDate(new Date()) // false
    
```

### Type extraction

```es6
console.log([
    undefined,
    null,
    false,
    0,
    '',
    [],
    {},
    function () {
    },
    arguments,
    /$/,
    new Date()
].map(check.getType))
```

Outputs:
```txt
[ 'undefined',
  'null',
  'boolean',
  'number',
  'string',
  'array',
  'object',
  'function',
  'arguments',
  'regexp',
  'date' ]
```

### Extensibility

Checks are available even for types not included in the library:

```es6

import { check as checkGen } from 'istypes';

const check = checkGen(new Map(), new Set(), new Error(), Symbol.iterator, Buffer.from(''));

check.isUndefined(undefined) // true
check.isMap(new Map()) // true
check.getType(new Set()) // 'set'
check.isError(new Error()) // true
check.isSymbol(Symbol.species) // true
// here is a small catch with Buffer:
check.isUint8Array(Buffer.from('123')) // true, after all, Buffer is a type 'Uint8Array'
check.getType(Buffer.from('456')) // 'uint8array'

```

### Grouping by type:

```es6
import { groupByType } from 'istypes';

function (/* variable signature, name? : string, options? : object, callback? : function */) {
  const argsArr = Array.from(arguments);
  const grouped = groupByType(argsArr);
  
  if (grouped.string) {
    // name provided
  }
  
  if (grouped.object) {
    // options provided
  }
  
  if (grouped['function']) {
    // callback provided
  }
  
  // ...
}

```

## Contributing

Please use the [issues page](https://github.com/andrevinsky/istypes/issues) to report a bug or request a feature.

## Stay in Touch

* [Twitter](https://twitter.com/andrevinsky)

## License

[MIT](LICENSE)

## Author

Andrew Revinsky
