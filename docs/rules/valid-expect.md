# Enforce valid `expect()` usage (valid-expect)

Ensure `expect()` is called with a single argument and there is an actual expectation made.

## Rule details

This rule triggers a warning if `expect()` is called with more than one argument or without arguments. 
It would also issue a warning if there is nothing called on `expect()`.

This rule is enabled by default.

### Default configuration

The following patterns are considered warnings:

```js
expect();
expect().toEqual("something");
expect("something", "else");
expect("something");
```

The following patterns are not warnings:

```js
expect("something").toEqual("something");
```
