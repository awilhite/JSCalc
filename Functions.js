(function() {
  var base, bin, dec, digitsAfterPoint, factorial, gradToRad, lgn, logab, mod, round, roundAfter;

  roundAfter = 0.0000009;

  digitsAfterPoint = 11;

  factorial = function(n, r) {
    var i;
    if (r == null) r = 1;
    for (i = 1; 1 <= n ? i <= n : i >= n; 1 <= n ? i++ : i--) {
      r *= i;
    }
    return r;
  };

  gradToRad = function(a) {
    return a * Math.PI / 180;
  };

  logab = function(a, b) {
    return Math.log(a) / Math.log(b);
  };

  lgn = function(a) {
    return Math.log(a) / Math.log(10);
  };

  base = function(a, b, c) {
    return parseInt(a, c || 10).toString(b);
  };

  bin = function(a) {
    return base(a, 2, 10);
  };

  dec = function(a) {
    return base(a, 10, 2);
  };

  mod = function(a, b) {
    return a % b;
  };

  round = function(int) {
    var digits;
    digits = Math.pow(10, digitsAfterPoint);
    return Math.round(int * digits) / digits;
  };

}).call(this);
