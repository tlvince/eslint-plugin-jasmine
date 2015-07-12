# Disallow the use of duplicate suite names (no-suite-dupes)

Jasmine uses `describe` to begin and name a test suite.

Multiple suites with the same name is confusing and is an indicator of a
copy-paste error.

## Rule details

This rule triggers a **warning** (is set to **1** by default) whenever it
encounters duplicated suite names.

The following patterns are considered warnings:

```js
describe("Same suite name", function() {});
describe("Same suite name", function() {});
```

The following patterns are not warnings:

```js
describe("The first suite name", function() {});
describe("The second suite name", function() {});
```
