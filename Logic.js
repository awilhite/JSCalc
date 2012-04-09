(function() {
  var number, polynomial;

  polynomial = /^(\-?\d*\/?\.?\d*)[a-z]{1}\^(\-?\d+\/?\.?\d*)[+-]{1}(?:(\-?\d*\/?\.?\d*)(?:[a-z]{1}\^(\d*\/?\.?\d*))?(?:[+-]{1})?)+(\-?\d*\/?\.?\d*)?$/i;

  number = XRegExp.build('-?{{fraction}}|{{decimal}}|{{int}}|{{scNot}}|{{complex}}', {
    int: /[0-9]+/,
    fraction: XRegExp.build('', {
      number: /-?\d+(?:\.\d+)?/
    }),
    decimal: /([0-9]+|)\.[0-9]+/,
    scNot: /(([0-9]+|).[0-9]{2}\s?[xX]{1}\s?10^[0-9]+|([0-9]+|).[0-9]{2}[eE]{1}[0-9]+)/
  });

}).call(this);
