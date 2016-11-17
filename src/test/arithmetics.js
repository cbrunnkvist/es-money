const assert = require('assert')
const Money = require('../')

describe('Arithmetic operations', () => {
  const oneUSD = new Money('USD', 1)

  context('addition', () => {
    it('works when currency matches', () => {
      const sum = oneUSD.add(oneUSD)
      assert.equal(sum.currency, 'USD')
      assert.equal(sum.amount, 2)
    })

    it('does not return fractional subunits', () => {
      const sum = (new Money('USD', 0.1)).add(new Money('USD', 0.2))
      assert.equal(sum.currency, 'USD')
      assert.equal(sum.amount, 0.3)
    })

    it('fails when the currencies differ', () => {
      assert.throws(
        () => {
          oneUSD.add(new Money('THB', 1))
        },
        /CurrencyMismatchError/
      )
    })
  })

  context('subtraction', () => {
    it('can subtract values', () => {
      const difference = oneUSD.subtract(oneUSD)
      assert.equal(difference.currency, 'USD')
      assert.equal(difference.amount, 0)
    })

    it('does not return fractional subunits', () => {
      const sum = (new Money('USD', 0.4)).subtract(new Money('USD', 0.1))
      assert.equal(sum.currency, 'USD')
      assert.equal(sum.amount, 0.3)
    })

    it('fails when the currencies differ', () => {
      assert.throws(
        () => {
          oneUSD.subtract(new Money('THB', 1))
        },
        /CurrencyMismatchError/
      )
    })
  })

  context('multiplication', () => {
    it('can multiply values', () => {
      const product = oneUSD.multiply(1.5)
      assert.equal(product.currency, 'USD')
      assert.equal(product.amount, 1.5)
    })

    it('does not return fractional subunits', () => {
      const sum = (new Money('USD', 111)).multiply(0.1)
      assert.equal(sum.currency, 'USD')
      assert.equal(sum.amount, 11.1)
    })

    it('fails if factor is not a number', () => {
      assert.throws(() => { oneUSD.multiply(oneUSD) }, /TypeError/)
      assert.throws(() => { oneUSD.multiply(null) }, /TypeError/)
    })
  })

  context('division by split', () => {
    it('allocates an amount proportionally', () => {
      const parts = (new Money('USD', 150)).allocate([1, 2])
      assert.equal(parts.length, 2)
      assert.equal(parts[0].amount, 50)
      assert.equal(parts[1].amount, 100)
    })

    it('does not allocate fractional subunits', () => {
      const parts = (new Money('USD', 100)).allocate([1, 1, 1])
      assert.equal(parts.length, 3)
      assert.equal(parts[0].amount, 33.34)
      assert.equal(parts[1].amount, 33.33)
      assert.equal(parts[2].amount, 33.33)
    })
  })
})
