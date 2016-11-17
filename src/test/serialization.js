const assert = require('assert')
const Money = require('../')

describe('JSON interface', () => {
  before(() => {
    this.object = new Money('USD', 1)
    this.string = '{"currency":"USD","amount":"1.00"}'
  })

  it('can serialize from Money object', () => {
    assert.equal(JSON.stringify(this.object), this.string)
  })

  it('can deserialize into Money object', () => {
    const other = Money.fromObject(JSON.parse(this.string))
    assert(this.object.equalTo(other))
  })
})
