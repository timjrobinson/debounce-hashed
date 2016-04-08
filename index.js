module.exports = function (fn, hashingfn, wait, options) {
  var timeouts = {};
  var maxTimeouts = {};
  options = options || {};
  if (typeof options === "boolean") {
    options = {immediate: options};
  }

  return function () {
    var context = this;
    var args = arguments;
    var hash = hashingfn.apply(this, arguments);
    var timeout = timeouts[hash];
    var maxTimeout = options.maxWait && maxTimeouts[hash];
    var callNow = options.immediate && !timeout;

    function later() {
      delete timeouts[hash];
      if (maxTimeouts[hash]) {
        clearTimeout(maxTimeouts[hash]);
        delete maxTimeouts[hash];
      }
      if (!options.immediate) fn.apply(context, args);
    }

    if (timeout) clearTimeout(timeout);
    timeouts[hash] = setTimeout(later, wait);
    if (options.maxWait && !maxTimeout) {
      maxTimeouts[hash] = setTimeout(later, options.maxWait);
    }
    if (callNow) return fn.apply(context, args);
  };
};
