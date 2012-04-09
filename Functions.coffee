roundAfter = 0.0000009
digitsAfterPoint = 11

factorial = (n, r = 1) ->
	for i in [1..n]
	    r *= i
	return r

gradToRad = (a) ->
	a * Math.PI / 180

logab = (a, b) ->
	Math.log(a) / Math.log(b)

lgn = (a) ->
	Math.log(a) / Math.log(10)
  
base = (a, b, c) ->
	parseInt(a, c || 10).toString(b)

bin = (a) ->
	base(a, 2, 10)

dec = (a) ->
	base(a, 10, 2)

mod = (a, b) ->
	a % b
	
round = (int) ->
    digits = Math.pow( 10, digitsAfterPoint )
    Math.round( int * digits ) / digits


	
	