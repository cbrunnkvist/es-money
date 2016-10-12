const assert = require('assert')
const Money = require('../')

describe('Money object', () => {
  before(() => {
    this.oneUSD = new Money('USD', 1)
  })

  it('only exposes currency code and amount', () => {
    const props = Object.keys(this.oneUSD).sort()
    const expected = ['amount', 'currency']
    assert.deepEqual(props, expected)
  })

  it('treats amount as string')
})
