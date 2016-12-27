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

```es6
import { check } from 'istypes';

const positives = [
  check.isUndefined,
  check.isNull,
  check.isBoolean,
  check.isNumber,
  check.isString,
  check.isArray,
  check.isObject,
  check.isFunction,
  check.isArguments,
  check.isRegExp,
  check.isDate
];

const negatives = [
  check.isNotUndefined,
  check.isNotNull,
  check.isNotBoolean,
  check.isNotNumber,
  check.isNotString,
  check.isNotArray,
  check.isNotObject,
  check.isNotFunction,
  check.isNotArguments,
  check.isNotRegExp,
  check.isNotDate
];

// ...
if (check.isUndefined(input)) {
   // ...
}
// ...

    
```

### Grouping by type:

```es6
import { groupByType } from 'istypes';

function (/* variable signature*/) {
  const args = [].slice.call(arguments);
  const grouped = groupByType(args);
  
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

Please use the [issues page](https://github.com/AndrewRevinsky/istypes/issues) to report a bug or request a feature.

## Stay in Touch

* [Twitter](https://twitter.com/andrevinsky)

## License

[MIT](LICENSE)

## Author

Andrew Revinsky
