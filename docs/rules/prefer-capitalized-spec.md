# enforce or disallow capitalization of the first letter of spec names (prefer-capitalized-spec)

## Rule details

This rule aims to enforce a consistent style of it statements across tests, specifically by either requiring or disallowing a capitalized letter as the first word character in an it statement. The reasoning behind this rule is that the it statement is a continuation of the describe statement. Both together form a complete sentence in many test reporters. For example:

```js
describe("User name", function() {
  it("is required.", function() {
  });
});
```

may be reported by a test reporter as: User name is required.

By default, this rule will be disabled.

## Options
The rule has two options: "always" or "never" which determines whether the capitalization of the first word of an it statement should be required or forbidden or ignored entirely (the default).

Here is an example configuration:

```js
{
  "prefer-capitalized-it": [
    "error",
    "always"
  ]
}
```

### "always"
Using the always option means that this rule will report any it statements which start with a lowercase letter.

The following pattern is a warning:

```js
describe("", function() {
  it("this is invalid.", function() {
  });
});
```

### "never"
Using the never option means that this rule will report any it statements which start with a uppercase letter.

The following pattern is a warning:

```js
describe("", function() {
  it("This is invalid.", function() {
  });
});
```
