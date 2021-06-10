# Prefer Promise Strategies

This rule recommends using `resolveTo(X)` and `rejectWith(X)` instead of `returnValue(Promise.resolve(X))` and `returnValue(Promise.reject(X))`.

Aside from leading to more concise code, transforming `returnValue(Promise.reject(X))` can also avoid an unwanted `UnhandledPromiseRejectionWarning`.

## Rule details

Examples of *incorrect* code:

```js
const spy = jasmine.createSpy();

spy.withArgs(0).returnValue(Promise.resolve(123));
spy.and.returnValue(Promise.reject(123));
```

Examples of *correct* code:

```js
const spy = jasmine.createSpy();

spy.withArgs(0).resolveTo(123);
spy.and.rejectWith(123);
```

## Limitations

To avoid false positives, this rule only considers `returnValue` calls that match the pattern `X.{and,withArgs(Y)}.returnValue(Z)`. Thus, the following *incorrect* code is *not* recognized:

```js
const strategy = jasmine.createSpy().and;
strategy.returnValue(Promise.resolve(123));
```
