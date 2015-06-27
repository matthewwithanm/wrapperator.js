module.exports = function wrapperator(fn) {
  return function decorator(hostOrWrappedFn, name, descriptor) {

    // If the function's being used as a decorator…
    if (descriptor && typeof hostOrWrappedFn === 'object') {
      // …return a descriptor that overwrites itself with a wrapped version of
      // the function. This means each instance will get a new wrapping.
      return {
        configurable: true,
        get: function () {
          var wrapped = fn(descriptor.value);
          Object.defineProperty(this, name, {
            value: wrapped,
            configurable: true,
            writable: true
          });
          return wrapped;
        }
      };
    }

    // The function's just being used as a wrapper.
    return fn(hostOrWrappedFn);
  }
}
