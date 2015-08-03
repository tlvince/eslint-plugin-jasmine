# Disallow the use of duplicate spec names (no-spec-dupes)

Jasmine uses `it` to begin and name a test spec.

Multiple specs with the same name is confusing and is an indicator of a
copy-paste error.

## Rule details

This rule triggers a **warning** (is set to **1** by default) whenever it
encounters duplicated spec names.

### Block mode (default)

The following patterns are considered warnings:

```js
it("Same spec name", function() {});
it("Same spec name", function() {});
```

```js
describe("Unique parent", function(){
  it("Same spec name", function() {});
});
describe("Different parent", function(){
  it("Same spec name", function() {});
});
```

The following patterns are not warnings:

```js
it("Different spec name", function() {});
it("Unique spec name", function() {});
```

### Branch mode

In this mode, `it` can share the same description unless the branch they
form has already be defined.

The following patterns are considered warnings:

```js
describe("Parent context", function(){
  describe("Same branch", function(){
    it("Same spec name", function() {});
    it("Same spec name", function() {});
  });
});
```

```js
describe("Parent context", function(){
  describe("Same branch", function(){
    it("Same spec name", function() {});
  });
  describe("Same branch", function(){
    it("Same spec name", function() {});
  });
});
```

The following patterns are not warnings:

```js
describe("Some context", function(){
  describe("Same branch", function(){
    it("Same spec name", function() {});
  });
});
describe("Another context", function(){
  describe("Same branch", function(){
    it("Same spec name", function() {});
  });
});
```
