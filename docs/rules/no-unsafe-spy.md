# Enforce spies to be defined in before/after/it blocks

Make sure named spies are declared only in before/after/it jasmine blocks.
Spies created in global scope or directly in define blocks don't
get automatically reset/cleaned by the jasmine teardown process, making it possible
to get false positives when using ```toHaveBeenCalled()``` / ```toHaveBeenCalledWith()```.

This rule checks for the following methods: `spyOn`, `jasmine.createSpy()`, `jasmine.createSpyObj()`.

## Rule details

The following are considered warnings:

```js
// myFile.js
var mySharedSpy = jasmine.createSpy()
spyOn(someObj, "someMethod")

describe(function () {
  var mySharedSpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})
```

The following patterns are not warnings:

```js
beforeEach(function () {
  var mySpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})

beforeAll(function () {
  var mySpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})

afterEach(function () {
  var mySpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})

afterAll(function () {
  var mySpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})

it(function () {
  var mySpy = jasmine.createSpy()
  spyOn(someObj, "someMethod")
})
```
