module.exports = class CurrencyMismatchError extends Error {
  constructor(oneCurrency, otherCurrency) {
    super()
    this.name = this.constructor.name
    this.message = `comparing ${oneCurrency} with ${otherCurrency}`
    Error.captureStackTrace(this, CurrencyMismatchError)
  }
}
