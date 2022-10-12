# Prefer toBeFalse

This rule recommends using `toBeFalse` instead of the more generic matcher
`toBe(false)`.

## Rule details

This rule forces a codebase to be consistent when expecting values to be
`false` in unit tests.

## Options

### always

The `"always"` option (default) prefers `toBeFalse()`. Select this option
if you'd like developers to use a matcher that tests specifically for
`false`.

Examples of *incorrect* code for the `"always"` option:

```js
expect(value).toBe(false);
expect(value).toBe(false, 'with an explanation');
```

Examples of *correct* code for the `"always"` option:

```js
expect(value).toBeFalse();
expect(value).toBeFalse('with an explanation');
```

### never

The `"never"` option prefers `toBe(false)`. Select this option if you'd
like developers to use the `toBe` matcher consistently, whether testing
for `false` or not.

Examples of *incorrect* code for the `"never"` option:

```js
expect(value).toBeFalse();
expect(value).toBeFalse('with an explanation');
```

Examples of *correct* code for the `"never"` option:

```js
expect(value).toBe(false);
expect(value).toBe(false, 'with an explanation');
```
