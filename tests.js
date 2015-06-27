var wrapperator = require('./index');
var assert = require('assert');


// Create a wrapperator for testing!
var countCalls = wrapperator(function(fn) {
  function wrapper() {
    wrapper.callCount += 1;
    return fn.apply(this, arguments);
  }
  wrapper.callCount = 0;
  return wrapper;
});


it('returns a wrapper', function() {
  var wrappedCalled = false;
  var f = countCalls(function() { wrappedCalled = true; });
  f();
  assert(wrappedCalled);
  assert.equal(f.callCount, 1);
});

it('returns a decorator', function() {
  var wrappedCalled = false;
  function Klass() {}
  var descriptor = {
    value: function() { wrappedCalled = true; },
    enumerable: false,
    writable: true,
    configurable: true
  };
  Object.defineProperty(Klass.prototype, 'f', countCalls(Klass.prototype, 'f', descriptor) || descriptor);

  var inst = new Klass();
  inst.f();
  assert(wrappedCalled);
  assert.equal(inst.f.callCount, 1);
});
