# Disallow the assignment of a `spyOn` return value

It is often more obvious to pass the spy as a property of the object spied upon
instead of from a referencing variable.

The following are considered warnings:

```js
var someSpy = spyOn(someObj, 'someMethod');
// Handle someSpy, for example
// expect(someSpy).toHaveBeenCalled();
```

The following are not warnings:

```js
spyOn(someObj, 'someMethod');
// Handle someObj.someMethod, for example
// expect(someObj.someMethod).toHaveBeenCalled();
```
