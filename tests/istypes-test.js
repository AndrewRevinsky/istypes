/**
 * Created by andrew on 12/27/16.
 */
import { expect } from 'chai';

import istypes, { check, groupByType } from '../src/index';
import { check as checkGen} from '../src/index';

describe('library exports: ', () => {

  describe('default export', () => {
    it('is an exact set of checks present on a `check` (named export)', () => {

      const isProps = (/.*/).test.bind(/(^is)|(^getType$)/);
      expect(istypes).to.be.an('object');
      expect(check).to.be.a('function');
      expect(Object.getOwnPropertyNames(istypes)).to.deep.equal(Object.getOwnPropertyNames(check).filter(isProps));
    })

  });

  describe('`check` (named export)', () => {

    const instances = [
      undefined,
      null,
      false,
      0,
      '',
      [],
      {},
      function () {},
      arguments,
      /$/,
      new Date()
    ];

   const instTypes = [
      'undefined',
      'null',
      'boolean',
      'number',
      'string',
      'array',
      'object',
      'function',
      'arguments',
      'regexp',
      'date'
    ];

    const positives = [
      'isUndefined',
      'isNull',
      'isBoolean',
      'isNumber',
      'isString',
      'isArray',
      'isObject',
      'isFunction',
      'isArguments',
      'isRegExp',
      'isDate'
    ];

    const negatives = [
      'isNotUndefined',
      'isNotNull',
      'isNotBoolean',
      'isNotNumber',
      'isNotString',
      'isNotArray',
      'isNotObject',
      'isNotFunction',
      'isNotArguments',
      'isNotRegExp',
      'isNotDate'
    ];

    const primitives = [
      true, // undefined,
      true, // null,
      true, // false,
      true, // 0,
      true, // '',
      false, // [],
      false, // {},
      false, // function () {},
      false, // arguments,
      false, // /$/,
      false, // new Date()
    ];

    const iterables = [
      false, // undefined,
      false, // null,
      false, // false,
      false, // 0,
      true, // '',
      true, // [],
      false, // {},
      false, // function () {},
      true, // arguments,
      false, // /$/,
      false, // new Date()
    ];

    const arrayLikes = [
      false, // undefined,
      false, // null,
      false, // false,
      false, // 0,
      false, // '',
      true, // [],
      false, // {},
      false, // function () {},
      true, // arguments,
      false, // /$/,
      false, // new Date()
    ];


    describe(`provides methods '.isXxx(input)' for positive type checking:`, () => {

      positives.forEach((pos, posIdx) =>
        it(`method .${ pos }(test)`, () => {

          const whatIs = check[ pos ];

          instances.forEach((subject, idx) => {

            if (posIdx === idx) {
              expect(whatIs(subject)).to.be.ok;
            } else {
              expect(whatIs(subject)).to.not.be.ok;
            }

          });
        })
      );

      it('method .isPrimitive(test)', () => {
        instances.forEach((subject, idx) => {
          if (primitives[idx]) {
            expect(check.isPrimitive(subject)).to.be.ok;
          } else {
            expect(check.isPrimitive(subject)).to.not.be.ok;
          }

        });
      });

     it('method .isIterable(test)', () => {
        instances.forEach((subject, idx) => {
          if (iterables[idx]) {
            expect(check.isIterable(subject)).to.be.ok;
          } else {
            expect(check.isIterable(subject)).to.not.be.ok;
          }
        });
      });

     it('method .isArrayLike(test)', () => {
        instances.forEach((subject, idx) => {
          if (arrayLikes[idx]) {
            expect(check.isArrayLike(subject)).to.be.ok;
          } else {
            expect(check.isArrayLike(subject)).to.not.be.ok;
          }
        });
      });

    });

    describe(`provides methods '.isNotXxx(test)' for negative type checking:`, () => {
      negatives.forEach((neg, negIdx) =>
        it(`method .${ neg }(test)`, () => {

          const whatIsNot = check[ neg ];

          instances.forEach((subject, idx) => {

            if (negIdx === idx) {
              expect(whatIsNot(subject)).to.not.be.ok;
            } else {
              expect(whatIsNot(subject)).to.be.ok;
            }

          });
        })
      );

      it('method .isNotPrimitive(test)', () => {
        instances.forEach((subject, idx) => {
          if (primitives[ idx ]) {
            expect(check.isNotPrimitive(subject)).to.not.be.ok;
          } else {
            expect(check.isNotPrimitive(subject)).to.be.ok;
          }
        });
      });

      it('method .isNotIterable(test)', () => {
        instances.forEach((subject, idx) => {
          if (iterables[ idx ]) {
            expect(check.isNotIterable(subject)).to.not.be.ok;
          } else {
            expect(check.isNotIterable(subject)).to.be.ok;
          }
        });
      });

      it('method .isNotArrayLike(test)', () => {
        instances.forEach((subject, idx) => {
          if (arrayLikes[ idx ]) {
            expect(check.isNotArrayLike(subject)).to.not.be.ok;
          } else {
            expect(check.isNotArrayLike(subject)).to.be.ok;
          }
        });
      });

    });


    describe(`has a '.getType(test)' method to identify types..`, () => {
      instTypes.forEach((instType, typeIdx) =>
        it(`type: ${ instType }`, () => {

          instances.forEach((inst, instIdx) => {
            const type = check.getType(inst);

            if (instIdx === typeIdx) {
              expect(type).to.equal(instType)
            } else {
              expect(type).to.not.equal(instType)
            }

          })

        })
      );
    });


    describe('is also a function which allows to extend checks with other instances', () => {

      it('can test Map instances', () => {
        const { isMap, isNotMap, getType } = check(new Map());
        expect(isMap).to.be.a('function');
        expect(isNotMap).to.be.a('function');
        expect(isMap(new Map())).to.be.ok;
        expect(isMap([])).to.be.false;
        expect(isNotMap(true)).to.be.ok;

        expect(getType(new Map())).to.equal('map');

      });

      it('can test Set instances', () => {
        const { isSet, isNotSet, getType } = check(new Set());
        expect(isSet).to.be.a('function');
        expect(isNotSet).to.be.a('function');
        expect(isSet(new Set())).to.be.ok;
        expect(isSet([])).to.be.false;
        expect(isNotSet(true)).to.be.ok;

        expect(getType(new Set())).to.equal('set');

      });

      it('can test Error instances', () => {
        const { isError, isNotError, getType } = check(new Error());
        expect(isError).to.be.a('function');
        expect(isNotError).to.be.a('function');
        expect(isError(new Error())).to.be.ok;
        expect(isError([])).to.be.false;
        expect(isNotError(true)).to.be.ok;

        expect(getType(new Error())).to.equal('error');
      });

      it('can test Symbol instances', () => {
        const { isSymbol, isNotSymbol } = check(Symbol(1));
        expect(isSymbol).to.be.a('function');
        expect(isNotSymbol).to.be.a('function');
        expect(isSymbol(Symbol(2))).to.be.ok;
        expect(isSymbol(Symbol.iterator)).to.be.ok;
        expect(isSymbol('Symbol2')).to.be.false;
        expect(isNotSymbol('Symbol')).to.be.ok;
        expect(isNotSymbol(Symbol.species)).to.be.false;
      });

      it('can provide tests for several types in one call', () => {
        const { isMap, isNotMap, isSet, isNotSet, isError, isNotError } =
          check(new Map(), new Set(), new Error());

        expect(isMap).to.be.a('function');
        expect(isNotMap).to.be.a('function');
        expect(isMap(new Map())).to.be.ok;
        expect(isMap([])).to.be.false;
        expect(isNotMap(true)).to.be.ok;

        expect(isSet).to.be.a('function');
        expect(isNotSet).to.be.a('function');
        expect(isSet(new Set())).to.be.ok;
        expect(isSet([])).to.be.false;
        expect(isNotSet(true)).to.be.ok;

        expect(isError).to.be.a('function');
        expect(isNotError).to.be.a('function');
        expect(isError(new Error())).to.be.ok;
        expect(isError([])).to.be.false;
        expect(isNotError(true)).to.be.ok;

      });

    });

  });

  describe('`groupByType` (named export)', () => {
    it('groups an array of items by their type, replacing items of the same type', () => {

      expect(groupByType).to.be.a('function');

      const notArray = 'noarray';
      const group0 = groupByType(notArray);
      const expectedGroup0 = {};

      expect(group0).to.deep.equal(expectedGroup0);

      const array1 = [ 0, '0', false ];
      const group1 = groupByType(array1);
      const expectedGroup1 = {
        boolean: false,
        number: 0,
        string: '0'
      };

      expect(group1).to.deep.equal(expectedGroup1);

      const array2 = [ 0, '0', false, true, '1', 1 ];
      const group2 = groupByType(array2);
      const expectedGroup2 = {
        boolean: true,
        number: 1,
        string: '1'
      };

      expect(group2).to.deep.equal(expectedGroup2);

    })
  });

  describe('all readme examples are tested', () => {
    it('positives', () => {
      expect(check.isUndefined(undefined)).to.equal(true); // true
      expect(check.isNull(null)).to.equal(true); // true
      expect(check.isBoolean(true)).to.equal(true);  // true
      expect(check.isNumber(0)).to.equal(true);  // true
      expect(check.isNumber(parseInt('x')) ).to.equal(true);// true (NaN is a number)
      expect(check.isNumber(1 / 0)).to.equal(true);  // true (+Infinity is a number)
      expect(check.isString('')).to.equal(true); // true
      expect(check.isArray([]) ).to.equal(true); // true
      expect(check.isObject({})).to.equal(true); // true
      expect(check.isFunction(() => {})).to.equal(true); // true
      (function () {
        expect(check.isArguments(arguments)).to.equal(true); // true
      })();
      expect(check.isRegExp(/.*/)).to.equal(true);    // true
      expect(check.isDate(new Date())).to.equal(true); // true

    });
    
    it('negatives', () => {
      expect(check.isNotUndefined(undefined)).to.equal(false); // false
      expect(check.isNotNull(null)).to.equal(false); // false
      expect(check.isNotBoolean(false)).to.equal(false);  // false
      expect(check.isNotNumber(0)).to.equal(false);  // false
      expect(check.isNotNumber(parseInt('x')) ).to.equal(false);// false (NaN is a number)
      expect(check.isNotNumber(1 / 0)).to.equal(false);  // false (+Infinity is a number)
      expect(check.isNotString('')).to.equal(false); // false
      expect(check.isNotArray([]) ).to.equal(false); // false
      expect(check.isNotObject({})).to.equal(false); // false
      expect(check.isNotFunction(() => {})).to.equal(false); // false
      (function () {
        expect(check.isNotArguments(arguments)).to.equal(false); // false
      })();
      expect(check.isNotRegExp(/.*/)).to.equal(false);    // false
      expect(check.isNotDate(new Date())).to.equal(false); // false

    });

    it('isPrimitive(test)', () => {
      expect([
        // promitives :
        undefined,
        null,
        true,
        false,
        0,
        parseInt('x'),
        1 / 0,
        -1 / 0,
        '',
        Symbol.iterator,

        // complex:
        [],
        {},
        function () {
        },
        arguments,
        /$/,
        new Date(),
        new Error('')
      ].map(check.isPrimitive)).to.deep.equal([
        true, // undefined,
        true, // null,
        true, // true,
        true, // false,
        true, // 0,
        true, // parseInt('x'),
        true, // 1 / 0,
        true, // -1 / 0,
        true, // '',
        true, // Symbol.iterator,
        false,
        false,
        false,
        false,
        false,
        false,
        false ])
    });

    it('isIterable(test)', () => {
      // TODO: add code
    });
    it('isNotIterable(test)', () => {
      // TODO: add code
    });
    it('isArrayLike(test)', () => {
      // TODO: add code
    });

    it('isNotArrayLike(test)', () => {
      // TODO: add code
    });

    it('type extraction', () => {
      expect([
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
      ].map(check.getType)).to.deep.equal([
        'undefined',
        'null',
        'boolean',
        'number',
        'string',
        'array',
        'object',
        'function',
        'arguments',
        'regexp',
        'date'
      ])
    });

    it('extensibility', () => {

      const check = checkGen(new Map(), new Set(), new Error(), Symbol.iterator, Buffer.from(''));

      expect(check.isUndefined(undefined)).to.equal(true); // true
      expect(check.isMap(new Map())).to.equal(true); // true
      expect(check.getType(new Set())).to.equal('set'); // 'set'
      expect(check.isError(new Error())).to.equal(true); // true
      expect(check.isSymbol(Symbol.species)).to.equal(true); // true
      // here is a small catch with Buffer:
      expect(check.isUint8Array(Buffer.from('123'))).to.equal(true); // true, after all, Buffer is a type 'Uint8Array'
      expect(check.getType(Buffer.from('456'))).to.equal('uint8array'); // 'uint8array'

    });
    
    it('grouping by type', () => {

      (function (/* variable signature, name? : string, options? : object, callback? : function */) {
          const grouped = groupByType(arguments); //

          expect(grouped.string).to.be.ok;
          if (grouped.string) {
            // name provided
            expect(grouped.string).to.equal('user1');
          }

          expect(grouped.object).to.be.ok;
          if (grouped.object) {
            // options provided
            expect(grouped.object).to.deep.equal({ verbose: true });

          }

          expect(grouped['function']).to.be.ok;
          if (grouped['function']) {
            // callback provided
            expect(grouped['function']).to.not.throw;
            grouped['function'](true);
          }

          // ...
        }
      )((arg) => expect(arg).to.be.ok, { verbose: true }, 'user1');

    });
  })

});
