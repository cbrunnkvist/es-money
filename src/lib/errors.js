class CurrencyMismatchError extends TypeError {
  constructor(oneCurrency, otherCurrency) {
    super(`comparing ${oneCurrency} with ${otherCurrency}`)
    this.name = CurrencyMismatchError.name
    Error.captureStackTrace(this, CurrencyMismatchError)
  }
}

class CurrencyUnknownError extends TypeError {
  constructor(currency) {
    super(`${currency} doesn't match the code of any registered currency type`)
    this.name = CurrencyUnknownError.name
    Error.captureStackTrace(this, CurrencyUnknownError)
  }
}

class SubunitError extends RangeError {
  constructor(currency, minDenomination) {
    super(`${currency} amount must be a multiple of ${minDenomination}`)
    this.name = SubunitError.name
    Error.captureStackTrace(this, SubunitError)
  }
}

class AmountError extends TypeError {
  constructor(amount) {
    super(`Invalid amount '${amount}'`)
    this.name = AmountError.name
    Error.captureStackTrace(this, AmountError)
  }
}

exports.CurrencyMismatchError = CurrencyMismatchError
exports.CurrencyUnknownError = CurrencyUnknownError
exports.SubunitError = SubunitError
exports.AmountError = AmountError
