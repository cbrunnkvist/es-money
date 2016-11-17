const assert = require('assert')
const Money = require('../')

/* eslint-disable no-new */
describe('Money constructor', () => {
  it('requires a registered currency', () => {
    assert.throws(
      () => {
        new Money('OMG', 0)
      },
      /CurrencyUnknownError/
    )
  })

  it('takes an integer with optional decimals', () => {
    [
      1,
      1.1,
      1.11,
      1.11111111,
      -1.11111111,
    ].forEach((validAmount) => {
      assert.doesNotThrow(
        () => {
          new Money('XBT', validAmount)
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
        /SubunitError/,
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
        /AmountError/,
        `invalidAmount=${invalidAmount}`
      )
    })
  })
})
