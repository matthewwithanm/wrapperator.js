[JavaScript decorators][1] are cool and powerful, but usually you just want to
replace the method with a wrapped version. `wrapperator` makes it easy to do
that—and still use the same wrapper on normal functions.


Installation
------------

`npm install wrapperator`


Usage
-----

Create a function that wraps another, like normal:

```javascript
function sayHi(fn) {
  return function wrapped(...args) {
    console.log('hi');
    return fn.apply(this, ...args);
  };
}
```

Then create a wrapperator from it:

```javascript
import wrapperator from 'wrapperator';
sayHi = wrapperator(sayHi);
```

Now use it as a wrapper or a method decorator:

```javascript
class K {
  @sayHi // Used as a method decorator.
  f() { console.log('f!'); }
}

new K().f(); // Logs "hi" and "f!"

const g = sayHi(() => console.log('g!')); // Used as a wrapper
g(); // Logs "hi" and "g!"
```

You can also use function expressions to create wrapperators in one step:

```javascript
const sayHi = wrapperator(function(fn) {
  return function wrapped(...args) {
    console.log('hi');
    return fn.apply(this, ...args);
  };
});
```


[1]: https://github.com/wycats/javascript-decorators
