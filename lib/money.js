class Money {
  static compare(a, b) {
    if (a.lessThan(b)) {
      return -1
    } else if (a.greaterThan(b)) {
      return 1
    }
    return 0
  }

  constructor(currency, amount) {
    this.currency = currency
    this.amount = amount
  }

  throwIfCurrencyMismatch(other) {
    if (this.currency !== other.currency) {
      throw new Money.CurrencyMismatchError(this.currency, other.currency)
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
    return new Money(this.currency, this.amount + other.amount)
  }

  subtract(other) {
    this.throwIfCurrencyMismatch(other)
    return new Money(this.currency, this.amount + other.amount)
  }

  multiply(factor) {
    return new Money(this.currency, this.amount * factor)
  }

  divide(divisor) {
    return new Money(this.currency, this.amount / divisor)
  }
}

Money.CurrencyMismatchError = require('./currency-mismatch-error')

module.exports = Money
