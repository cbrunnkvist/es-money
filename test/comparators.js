const assert = require('assert')
const Money = require('../lib/money.js')

describe('Money comparators', () => {
  before(() => {
    this.zeroUSD = new Money('USD', 0)
    this.oneUSD = new Money('USD', 1)
  })

  it('can check if two values equal', () => {
    assert(this.oneUSD.equalTo(new Money('USD', 1)))
  })

  it('can check if a value is greater than another', () => {
    assert(this.oneUSD.greaterThan(this.zeroUSD))
  })

  it('can check if a value is less than another', () => {
    assert(this.zeroUSD.lessThan(this.oneUSD))
  })

  it('always fails when comparing across two different currencies', () => {
    assert.throws(
      () => {
        this.oneUSD.equalTo(new Money('THB', 1))
      },
      Money.CurrencyMismatchError
    )
  })

  context('Array.prototype.sort', () => {
    it('provides a compatible compare function', () => {
      assert.deepStrictEqual(
        [this.oneUSD, this.zeroUSD, this.oneUSD].sort(Money.compare),
        [this.zeroUSD, this.oneUSD, this.oneUSD]
      )
    })

    it('throws if asked to sort different currencies', () => {
      assert.throws(
        () => {
          [this.oneUSD, new Money('THB', 1)].sort(Money.compare)
        },
        Money.CurrencyMismatchError
      )
    })
  })
})
