const assert = require('assert')
const Money = require('../')

describe('Money object', () => {
  const oneUSD = new Money('USD', 1)
  const oneVND = new Money('VND', 1)

  it('only exposes currency and amount', () => {
    const props = Object.keys(oneUSD).sort()
    const expected = ['amount', 'currency']
    assert.deepEqual(props, expected)
  })

  it('throws an error if trying to mutate either currency or amount', () => {
    assert.throws(() => { oneUSD.amount = 0 }, Error, 'amount')
    assert.throws(() => { oneUSD.currency = '' }, Error, 'currency')
  })

  it('presents the amount as a string with correct precision', () => {
    assert.strictEqual(oneUSD.amount, '1.00')
    assert.strictEqual(oneVND.amount, '1')
  })
})
