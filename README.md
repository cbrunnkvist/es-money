# es-money
A value object class for dealing with money and currencies

[![Build Status](https://travis-ci.org/cbrunnkvist/es-money.svg?branch=master)](https://travis-ci.org/cbrunnkvist/es-money)

# ⚠️ Deprecation Notice

**This library is no longer maintained.** It has been rewritten and superseded by **[subunit-money](https://github.com/cbrunnkvist/subunit-money)**. 

Please use the new library for all future projects. 🤑

# Basic usage
```js
const Money = require('es-money')
const oneDollar = new Money('USD', 1) // Money {currency: 'USD', amount: '1.00'}
```

## Additional examples
```js
oneDollar.add(oneDollar)
// -> Money { currency: 'USD', amount: '1.00' }

oneDollar.subtract(oneDollar)
// -> Money { currency: 'USD', amount: '0.00' }

oneDollar.multiply(1.1)
// -> Money { currency: 'USD', amount: '1.10' }

oneDollar.allocate([75, 25])
// -> [Money { currency: 'USD', amount: '0.75' }, Money { currency: 'USD', amount: '0.25' }]

oneHundredDollars.allocate([1, 1, 1])
// -> [Money { currency: 'USD', amount: '33.34' }, Money { currency: 'USD', amount: '33.33' }, Money { currency: 'USD', amount: '33.33' }]

JSON.stringify(oneDollar) // -> '{"currency":"USD","amount":"1.00"}'
Money.fromObject({currency:'VND', amount:'1234'}) // -> Money { currency: 'VND', amount: '1234' }
```

## Custom exception types
Inherits from `Error`:
```js
Money.CurrencyMismatchError // Can't add apples to oranges
Money.CurrencyUnknownError // Currency code not registered
Money.SubunitError // Can't create fractional cents
Money.AmountError // Passed amount doesn't look like a number
```

## Registering / modifying currencies
The module comes with >120 currencies by default in [./currencymap.json](./currencymap.json). In addition, definitions can be added or updates like so:
```js
Money.registerCurrency('XYZ', {decimalDigits: 2})
new Money('XYZ', 3.14) // ... and so on
```

# Design rationale
- Keep feature set and module interface minimal _(a value object should be just a value object)_
- Store amounts internally in integer subunit form _(and avoid implementation leak)_
- Present amounts in string form _(to avoid precision ambiguities)_
- Fail / throw exceptions early _(to avoid mistakes from proliferating)_
- Use accessors for immutable properties _(to allow exceptions even if the calling code forgot to `'use strict'` itself)_
- Don't deal in currency-specific rounding rules _(they are likely application-specific anyway, and often complex enough to be the concern of a separate component)_
- Don't deal with localization of currency names _(or currency symbols, or other presentation-level stuff)_
- Test everything _(what else?)_

# Background
The __Money__ pattern is a well-known specialized form of the broader __Value Object__ design pattern: it provides a level of protection against common programming errors when dealing with financial records of multiple currencies.

Aside from the risk of mistakenly adding or subtracting values in differing currencies, the JavaScript `Number` type makes it easy to end up with impossibly tiny (-for the currency-) fractional amounts (e.g. `0.1 + 0.2` = `0.30000000000000004` or `100 * 1.1` = `110.00000000000001`) that end up causing issues in user interfaces and in communications with external systems.

## Module name
The `es-` prefix might be an abbreviation of _ECMAScript_ or _e(a)s(y)-_.

# Caveats
This module was written with transpilation for some feasible level of backwards compatibility, but will still probably not run on any Node.js version older than 4.6

# Acknowledgements
The included currency registry is based on data published by the LocalePlanet project: http://www.localeplanet.com/

# License
Copyright (c) 2016 Conny Brunnkvist. Licensed under the [MIT License](./LICENSE)
