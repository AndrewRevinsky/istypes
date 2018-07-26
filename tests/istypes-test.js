/**
 * Created by andrew on 12/27/16.
 */
import { expect } from 'chai';

import istypes, { check, groupByType } from '../src/index';

describe('library exports: ', () => {

  describe('default export', () => {
    it('is an exact set of checks present on a `check` (named export)', () => {

      const isProps = (/.*/).test.bind(/^is/);
      expect(istypes).to.be.an('object');
      expect(check).to.be.a('function');
      expect(Object.getOwnPropertyNames(istypes).filter(isProps)).to.deep.equal(Object.getOwnPropertyNames(check).filter(isProps));
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

    positives.forEach((pos, posIdx) =>
      it(`provides method for positive type checking: ${ pos }`, () => {

        const whatIs = check[pos];

        instances.forEach((subject, idx) => {

          if (posIdx === idx) {
            expect(whatIs(subject)).to.be.ok;
          } else {
            expect(whatIs(subject)).to.not.be.ok;
          }

        });
      })
    );

    negatives.forEach((neg, negIdx) =>
      it(`provides method for negative type checking: ${ neg }`, () => {

        const whatIsNot = check[neg];

        instances.forEach((subject, idx) => {

          if (negIdx === idx) {
            expect(whatIsNot(subject)).to.not.be.ok;
          } else {
            expect(whatIsNot(subject)).to.be.ok;
          }

        });
      })
    );


    describe('is also a function which allows to extend checks with other instances', () => {

      it('can test Map instances', () => {
        const { isMap, isNotMap } = check(new Map());
        expect(isMap).to.be.a('function');
        expect(isNotMap).to.be.a('function');
        expect(isMap(new Map())).to.be.ok;
        expect(isMap([])).to.be.false;
        expect(isNotMap(true)).to.be.ok;
      });

      it('can test Set instances', () => {
        const { isSet, isNotSet } = check(new Set());
        expect(isSet).to.be.a('function');
        expect(isNotSet).to.be.a('function');
        expect(isSet(new Set())).to.be.ok;
        expect(isSet([])).to.be.false;
        expect(isNotSet(true)).to.be.ok;
      });

      it('can test Error instances', () => {
        const { isError, isNotError } = check(new Error());
        expect(isError).to.be.a('function');
        expect(isNotError).to.be.a('function');
        expect(isError(new Error())).to.be.ok;
        expect(isError([])).to.be.false;
        expect(isNotError(true)).to.be.ok;
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
    it('groups an array of items by their type', () => {
      expect(groupByType).to.be.a('function');
    })
  });

});
