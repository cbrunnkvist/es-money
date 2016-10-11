class CurrencyMismatchError extends TypeError {
  constructor(oneCurrency, otherCurrency) {
    super()
    this.name = this.constructor.name
    this.message = `comparing ${oneCurrency} with ${otherCurrency}`
    Error.captureStackTrace(this, CurrencyMismatchError)
  }
}

class CurrencyUnknownError extends TypeError {
  constructor(currency) {
    super()
    this.name = this.constructor.name
    this.message = `${currency} doesn't match the code of any registered currency type`
    Error.captureStackTrace(this, CurrencyUnknownError)
  }
}

class SubunitError extends RangeError {
  constructor(currency, minDenomination) {
    super()
    this.name = this.constructor.name
    this.message = `${currency} amount must be a multiple of ${minDenomination}`
    Error.captureStackTrace(this, SubunitError)
  }
}

class AmountError extends TypeError {
  constructor(amount) {
    super()
    this.name = this.constructor.name
    this.message = `Invalid amount '${amount}'`
    Error.captureStackTrace(this, AmountError)
  }
}

exports.CurrencyMismatchError = CurrencyMismatchError
exports.CurrencyUnknownError = CurrencyUnknownError
exports.SubunitError = SubunitError
exports.AmountError = AmountError
