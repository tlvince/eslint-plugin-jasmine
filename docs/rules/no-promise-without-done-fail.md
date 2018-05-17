# Disallow using promise without a done.fail (no-promise-without-done-fail).

Make sure that all uses of the promises include a catch(done.fail) within a suite.

## Rule details

The following are considered warnings:

```js
describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(done);
  });
});

describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(function() {
      expect(true).toBe(true);
      done();
    });
  });
});
```

The following patterns are not warnings:

```js
describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(onSuccess, done.fail);
  });
});

describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(done.fail, onError);
  });
});

describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(function() {
      expect(true).toBe(true);
      done();
    }).catch(done.fail);
  });
});

describe('A suite', function(done) {
  it('A spec', function() {
    asyncCall().then(done.fail).catch(function() {
      expect(true).toBe(true);
      done();
    });
  });
});
```
