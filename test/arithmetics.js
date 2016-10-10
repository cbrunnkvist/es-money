const assert = require('assert')
const Money = require('../lib/money.js')

describe('Money arithmetic operations', () => {
  before(() => {
    this.oneUSD = new Money('USD', 1)
  })

  context('addition', () => {
    it('works when currency matches', () => {
      const sum = this.oneUSD.add(this.oneUSD)
      assert.equal(sum.currency, 'USD')
      assert.equal(sum.amount, 2)
    })

    it('fails when currency differs', () => {
      assert.throws(
        () => {
          this.oneUSD.add(new Money('THB', 1))
        },
        Money.CurrencyMismatchError
      )
    })
  })

  context('subtraction', () => {
    it('can subtract values', () => {
      const difference = this.oneUSD.subtract(this.oneUSD)
      assert.equal(difference.currency, 'USD')
      assert.equal(difference.amount, 2)
    })

    it('fails when subtracting two different currencies', () => {
      assert.throws(
        () => {
          this.oneUSD.subtract(new Money('THB', 1))
        },
        Money.CurrencyMismatchError
      )
    })
  })

  context('multiplication', () => {
    it('can multiply values', () => {
      const product = this.oneUSD.multiply(1.5)
      assert.equal(product.currency, 'USD')
      assert.equal(product.amount, 1.5)
    })
  })

  context('division', () => {
    it('can divide values', () => {
      const quotient = this.oneUSD.divide(2)
      assert.equal(quotient.currency, 'USD')
      assert.equal(quotient.amount, 0.5)
    })
  })
})
