const assert = require('assert')
const Money = require('../lib/money.js')

/* eslint-disable no-new */
describe('Money constructor', () => {
  it('requires a registered currency', () => {
    assert.throws(
      () => {
        new Money('OMG', 0)
      },
      Money.CurrencyUnknownError
    )
  })

  it('takes an integer with optional decimals', () => {
    [
      1,
      1.1,
      1.11,
    ].forEach((validAmount) => {
      assert.doesNotThrow(
        () => {
          new Money('USD', validAmount)
        },
        `validAmount=${validAmount}`
      )
    })
  })

  it('does not allow fractional subunits of the currency', () => {
    [
      0.001,
      -0.001,
    ].forEach((invalidAmount) => {
      assert.throws(
        () => {
          new Money('USD', invalidAmount)
        },
        Money.SubunitError,
        `invalidAmount=${invalidAmount}`
      )
    })
  })

  it('requires the amount to be either an integer or a decimal', () => {
    [
      '0.0.1',
      '00',
      '1.',
      '',
      null,
      undefined,
      'xyz',
    ].forEach((invalidAmount) => {
      assert.throws(
        () => {
          new Money('USD', invalidAmount)
        },
        Money.AmountError,
        `invalidAmount=${invalidAmount}`
      )
    })
  })
})
