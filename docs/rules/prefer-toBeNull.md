# Prefer toBeNull

This rule recommends using `toBeNull` instead of the more generic matcher
`toBe(null)`.

## Rule details

This rule forces a codebase to be consistent when expecting values to be
`null` in unit tests.

## Options

### always

The `"always"` option (default) prefers `toBeNull()`. Select this option
if you'd like developers to use a matcher that tests specifically for
`null`.

Examples of *incorrect* code for the `"always"` option:

```js
expect(value).toBe(null);
expect(value).toBe(null, 'with an explanation');
```

Examples of *correct* code for the `"always"` option:

```js
expect(value).toBeNull();
expect(value).toBeNull('with an explanation');
```

### never

The `"never"` option prefers `toBe(null)`. Select this option if you'd
like developers to use the `toBe` matcher consistently, whether testing
for `null` or not.

Examples of *incorrect* code for the `"never"` option:

```js
expect(value).toBeNull();
expect(value).toBeNull('with an explanation');
```

Examples of *correct* code for the `"never"` option:

```js
expect(value).toBe(null);
expect(value).toBe(null, 'with an explanation');
```
