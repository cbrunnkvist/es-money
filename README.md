# es-money
A value object class for dealing with money and currencies (ECMAScript>5 implementation)

# Basic usage
```js
const Money = require('es-money')
const oneDollar = new Money('USD', 1) # duck-type: {currency: "USD", amount: '1.00'}
```

## Additional examples
```js
oneDollar.add(oneDollar) # -> a new Money object
JSON.stringify(twoDollar) # -> '{"currency":"USD","amount":"1.00"}'
Money.fromObject({currency:'VND', amount:'1234'}) # -> a new Money object
```
## Registering / modifying currencies

# Design rationale
- Keep feature set and module interface minimal (a value object should be just a value object)
- Store amounts internally in integer form (and avoid implementation leak)
- Present amounts in string form (to avoid integer/float precision ambiguities)
- Don't deal in currency-specific rounding rules (they are likely application-specific anyway, and often complex enough to be the concern of a separate component)
- Don't deal with localization of currency names (and currency symbols, and other presentation-level stuff)
- Test everything

# Background
The __Money__ pattern is a well-known specialized form of the broader __Value Object__ design pattern: it provides a level of protection against common programming errors when dealing with financial records of multiple currencies.

Aside from the risk of mistakenly adding or subtracting values in differing currencies, the JavaScript `Number` type makes it easy to end up with impossibly tiny (-for the currency-) fractional amounts (e.g. `0.1 + 0.2` = `0.30000000000000004` or `100 * 1.1` = `110.00000000000001`) that end up causing issues in user interfaces and in communications with external systems.

## Module name
The `es-` prefix might be an abbreviation of _ECMAScript_ or _e(a)s(y)-_.

# Acknowledgements
The included currency registry is based on data published by the LocalePlanet project: http://www.localeplanet.com/
