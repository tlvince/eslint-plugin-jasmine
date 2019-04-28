# Prefer toBeUndefined

This rule recommends using `toBeUndefined` instead of the more generic matcher
`toBe(undefined)`.

## Rule details

This rule forces a codebase to be consistent when expecting values to be
`undefined` in unit tests.

## Options

### always

The `"always"` option (default) prefers `toBeUndefined()`. Select this option
if you'd like developers to use a matcher that tests specifically for
`undefined`.

Examples of *incorrect* code for the `"always"` option:

```js
expect(value).toBe(undefined);
expect(value).toBe(undefined, 'with an explanation');
```

Examples of *correct* code for the `"always"` option:

```js
expect(value).toBeUndefined();
expect(value).toBeUndefined('with an explanation');
```

### never

The `"never"` option prefers `toBe(undefined)`. Select this option if you'd
like developers to use the `toBe` matcher consistently, whether testing
for `undefined` or not.

Examples of *incorrect* code for the `"never"` option:

```js
expect(value).toBeUndefined();
expect(value).toBeUndefined('with an explanation');
```

Examples of *correct* code for the `"never"` option:

```js
expect(value).toBe(undefined);
expect(value).toBe(undefined, 'with an explanation');
```
