const assert = require('assert')
const Money = require('../')

describe('Money object', () => {
  before(() => {
    this.oneUSD = new Money('USD', 1)
    this.oneVND = new Money('VND', 1)
  })

  it('only exposes currency and amount', () => {
    const props = Object.keys(this.oneUSD).sort()
    const expected = ['amount', 'currency']
    assert.deepEqual(props, expected)
  })

  it('throws an error if trying to mutate either currency or amount', () => {
    assert.throws(() => { this.oneUSD.amount = 0 }, Error, 'amount')
    assert.throws(() => { this.oneUSD.currency = '' }, Error, 'currency')
  })

  it('presents the amount as a string with correct precision', () => {
    assert.strictEqual(this.oneUSD.amount, '1.00')
    assert.strictEqual(this.oneVND.amount, '1')
  })
})
