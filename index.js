module.exports = function wrapperator(fn) {
  return function decorator(hostOrWrappedFn, _, descriptor) {

    // If the function's being used as a decorator…
    if (descriptor && typeof hostOrWrappedFn === 'object') {
      // …return a descriptor that includes the wrapped method.
      return {
        value: fn(descriptor.value),
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable
      };
    }

    // The function's just being used as a wrapper.
    return fn(hostOrWrappedFn);
  }
}
