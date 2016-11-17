const Money = require('./lib/money')
const currencies = require('../currencymap.json')

Object.keys(currencies).forEach((code) => {
  Money.registerCurrency(code, currencies[code])
})

module.exports = Money
