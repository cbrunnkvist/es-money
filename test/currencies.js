const assert = require('assert')
const Money = require('../')

describe('Currency registry', () => {
  it('holds a default set of currencies', () => {
    const registrySize = Money.getCurrencies().length
    assert(registrySize > 100, `(${registrySize} registered)`)
  })

  it('can be extended with arbitrary currencies', () => {
    Money.registerCurrency('X', { decimal_digits: 0 })
    const fifteenX = new Money('X', 15)
    assert(fifteenX.amount, 15)
  })
})
