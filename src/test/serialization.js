const assert = require('assert')
const Money = require('../')

describe('JSON interface', () => {
  const asObject = new Money('USD', 1)
  const asString = '{"currency":"USD","amount":"1.00"}'

  it('can serialize from Money object', () => {
    assert.equal(JSON.stringify(asObject), asString)
  })

  it('can deserialize into Money object', () => {
    const other = Money.fromObject(JSON.parse(asString))
    assert(asObject.equalTo(other))
  })
})
