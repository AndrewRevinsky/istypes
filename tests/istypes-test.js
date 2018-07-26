/**
 * Created by andrew on 12/27/16.
 */
import { expect } from 'chai';

import istypes, { check, groupByType } from '../src/index';

describe('default export', () => {
  it('an exact copy of `check` (named export)', () => {
    expect(istypes).to.deep.equal(check);
  })
});

describe('check (named export)', () => {
  it('provides methods for positive and negative type checking', () => {
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

    [
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
    ].forEach((subject, idx) => {

      const whatIs = positives[idx];

      expect(whatIs(subject)).to.be.true;

      const whatIsNots = negatives.filter((_i, nidx) => nidx === negatives[idx]);

      whatIsNots.forEach(whatIsNot => {
        expect(whatIsNot(subject)).to.be.true;
      })
    });
  })
});

describe('groupByType (named export)', () => {
  it('groups an array of items by their type', () => {
    expect(groupByType).is.a.function;
  })
});