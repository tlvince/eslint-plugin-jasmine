# Prefer toBeTrue

This rule recommends using `toBeTrue` instead of the more generic matcher
`toBe(true)`.

## Rule details

This rule forces a codebase to be consistent when expecting values to be
`true` in unit tests.

## Options

### always

The `"always"` option (default) prefers `toBeTrue()`. Select this option
if you'd like developers to use a matcher that tests specifically for
`true`.

Examples of *incorrect* code for the `"always"` option:

```js
expect(value).toBe(true);
expect(value).toBe(true, 'with an explanation');
```

Examples of *correct* code for the `"always"` option:

```js
expect(value).toBeTrue();
expect(value).toBeTrue('with an explanation');
```

### never

The `"never"` option prefers `toBe(true)`. Select this option if you'd
like developers to use the `toBe` matcher consistently, whether testing
for `true` or not.

Examples of *incorrect* code for the `"never"` option:

```js
expect(value).toBeTrue();
expect(value).toBeTrue('with an explanation');
```

Examples of *correct* code for the `"never"` option:

```js
expect(value).toBe(true);
expect(value).toBe(true, 'with an explanation');
```
