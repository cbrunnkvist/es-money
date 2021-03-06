const errors = require('./errors')

const currencies = {}
const minDenomination = Symbol('value per subunit')
const subunitAmount = Symbol('amount in subunits')

function throwImmutabilityError() {
  throw new TypeError('Money instance amount is immutable')
}

class Money {
  static fromObject(object) {
    return new Money(object.currency, object.amount)
  }

  static getCurrencies() {
    return Object.keys(currencies).sort().map(code => currencies[code])
  }

  static registerCurrency(code, metadata) {
    currencies[code] = {
      code,
      decimalDigits: metadata.decimal_digits,
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
    if (this[subunitAmount] % 1 || Math.abs(amount) > Math.abs(this[subunitAmount])) {
      throw new errors.SubunitError(currency, this[minDenomination])
    }

    Object.defineProperty(this, 'currency', {
      enumerable: true,
      get: () => currency,
      set: throwImmutabilityError,
    })

    Object.defineProperty(this, 'amount', {
      enumerable: true,
      get: () => {
        const decimalDigits = (currencies[this.currency].decimalDigits)
        return (this[subunitAmount] * this[minDenomination]).toFixed(decimalDigits)
      },
      set: throwImmutabilityError,
    })
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
    const sum = this[subunitAmount] + (other.amount / this[minDenomination])
    return new Money(this.currency, sum * this[minDenomination])
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
}

Object.assign(Money, errors)

module.exports = Money
