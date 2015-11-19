# Enforce using named spies (named-spy)

Make sure named spies are used and the assigned variable matches the spy name.
Using properly named spies makes stacktraces more obvious.

## Rule details

The following are considered warnings:

```js
var spy = jasmine.createSpy();
callback = jasmine.createSpy('success');
```

The following patterns are not warnings:

```js
var success = jasmine.createSpy('success')
onError = jasmine.createSpy('onError')
```
