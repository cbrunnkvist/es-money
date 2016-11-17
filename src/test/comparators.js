const assert = require('assert')
const Money = require('../')

describe('Money comparators', () => {
  const zeroUSD = new Money('USD', 0)
  const oneUSD = new Money('USD', 1)

  it('can check if two values equal', () => {
    assert(oneUSD.equalTo(new Money('USD', 1)))
  })

  it('can check if a value is greater than another', () => {
    assert(oneUSD.greaterThan(zeroUSD))
  })

  it('can check if a value is less than another', () => {
    assert(zeroUSD.lessThan(oneUSD))
  })

  it('always fails when comparing across two different currencies', () => {
    assert.throws(
      () => {
        oneUSD.equalTo(new Money('THB', 1))
      },
      /CurrencyMismatchError/
    )
  })

  context('Array.prototype.sort', () => {
    it('provides a compatible compare function', () => {
      assert.deepStrictEqual(
        [oneUSD, zeroUSD, oneUSD].sort(Money.compare),
        [zeroUSD, oneUSD, oneUSD]
      )
    })

    it('throws if asked to sort different currencies', () => {
      assert.throws(
        () => {
          [oneUSD, new Money('THB', 1)].sort(Money.compare)
        },
        /CurrencyMismatchError/
      )
    })
  })
})
