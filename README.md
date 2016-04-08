# Debounce based on a hashing function

This is basically [underscore's debounce](http://underscorejs.org/#debounce) with an additional hashing function.

Example:

```js
function ping(user) {
  user.ping()
}

// You want to debounce these pings at a 100ms interval,
// but on a per user basis

var debounceHashed = require('debounce-hashed')

var pingDebounced = debounceHashed(ping, function hashingFn(user) {
  return user.id
}, 100)

// Or if you ping only by userid

var pingDebounced2 = debounceHashed(function pingById(userid) {
  user.getById(userid, function (err, user) {
    if (!err && user) user.ping();
  })
}, function hashingFn(userid) {
  return userid
}, 100)
```

## debounceHashed(fn, hashingfn, wait, [options])

* `fn` - the function to be debounced
* `hashingFn` - hashing function.
  Receives the same arguments as `fn`.
  Should return a string.
* `wait` - Time (in milliseconds) to wait before calling the function
* `options.immediate` - *boolean* - *default: false* - If true the function is called immediately, then not called again if it's called within `wait` ms. 
* `options.maxWait` - Max time to wait (in milliseconds) before calling the function, even if the debounced function is called repeatadly in < `wait` ms.

# License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.