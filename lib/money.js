const errors = require('./errors')

const currencies = {}
const minDenomination = Symbol('value per subunit')
const subunitAmount = Symbol('amount in subunits')

class Money {
  static getCurrencies() {
    return Object.keys(currencies).sort().map(code => currencies[code])
  }

  static registerCurrency(code, metadata) {
    currencies[code] = {
      code,
      minDenomination: Math.pow(10, -(metadata.decimal_digits)),
    }
  }

  static compare(a, b) {
    if (a.lessThan(b)) {
      return -1
    } else if (a.greaterThan(b)) {
      return 1
    }
    return 0
  }

  constructor(currency, amount) {
    if (!currencies[currency]) {
      throw new errors.CurrencyUnknownError(currency)
    }

    if (!/^-?\d+(?:\.\d+)?$/.test(amount) || /^-?00/.test(amount)) {
      throw new errors.AmountError(amount)
    }

    this[minDenomination] = currencies[currency].minDenomination
    this[subunitAmount] = Math.round(amount * (1 / this[minDenomination]))
    if (this[subunitAmount] % 1 || Math.abs(amount) > this._fixDecimals(amount)) {
      throw new errors.SubunitError(currency, this[minDenomination])
    }
    this.currency = currency
    Object.defineProperty(this, 'amount', { value: (this[subunitAmount] * this[minDenomination]), enumerable: true })
  }

  set amount(v) { // eslint-disable-line
    throw new TypeError('Money instance amount is immutable')
  }

  throwIfCurrencyMismatch(other) {
    if (this.currency !== other.currency) {
      throw new errors.CurrencyMismatchError(this.currency, other.currency)
    }
  }

  equalTo(other) {
    this.throwIfCurrencyMismatch(other)
    return (this.amount === other.amount)
  }

  greaterThan(other) {
    this.throwIfCurrencyMismatch(other)
    return (this.amount > other.amount)
  }

  lessThan(other) {
    this.throwIfCurrencyMismatch(other)
    return (this.amount < other.amount)
  }

  add(other) {
    this.throwIfCurrencyMismatch(other)
    let decimalPoints
    if (Math.floor(this[minDenomination]) === this[minDenomination]) {
      decimalPoints = 0
    } else {
      decimalPoints = this[minDenomination].toString().split('.')[1].length
    }

    const sum = (this.amount + other.amount).toFixed(decimalPoints)
    return new Money(this.currency, sum)
  }

  subtract(other) {
    this.throwIfCurrencyMismatch(other)
    const difference = this[subunitAmount] - (other.amount / this[minDenomination])
    return new Money(this.currency, difference * this[minDenomination])
  }

  multiply(factor) {
    if (isNaN(factor) || factor === null) {
      throw new TypeError(factor)
    }

    return new Money(this.currency, (this[subunitAmount] * factor) * this[minDenomination])
  }

  allocate(proportions) {
    if (!(proportions instanceof Array)) {
      throw new TypeError('proportions must be an Array')
    }

    const pSum = proportions.reduce((pre, cur) => pre + cur)
    let remaining = this[subunitAmount]

    let parts = proportions.map((p) => {
      const amount = Math.floor((this[subunitAmount] * (p / pSum)))
      remaining -= amount
      return amount
    })
    let i = 0
    while (remaining > 0) {
      remaining -= 1
      parts[i] += 1
      i += 1
    }
    parts = parts.map(subunits => new Money(this.currency, subunits * this[minDenomination]))
    return parts
  }

  _fixDecimals(newAmount) {
    const md = this[minDenomination]
    const decimalPoints = Math.floor(this[minDenomination]) === this[minDenomination] ? 0 : md.toString().split('.')[1].length
    return Number(newAmount).toFixed(decimalPoints)
  }
}

Object.assign(Money, errors)

module.exports = Money
