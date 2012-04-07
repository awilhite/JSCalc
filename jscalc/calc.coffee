funcEditLined = false
roundAfter = 0.0000009
digitsAfterPoint = 11

storage = ->
	if arguments.length < 2
		try
			JSON.parse(s)
		catch error
			localStorage.getItem(s)
	else 
		try
			JSON.stringify(s)
		catch error
			localStorage.setItem(arguments[0], arguments[1])
			
evaluate = ->
    val = input.val();
    if ///
    ^
    (\-?\d*)
    [a-z]{1}\^2([+\-]{1}\-?\d*)[a-z]{1}([+\-]{1}\-?\d*)
    $
    ///i.test(val) then solveQuad()
    else if false then solvePoly()
    
	

  
input.keydown = ->
    if input.val().length > 24 then input.css("font", "bold 40px 'Century Gothic', Helvetica, sans") else input.css("fontSize", "64px")
    if a.keyCode == 13 then evaluate()
		

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
	
solveQuad = (str) ->
	a = 0; b = 0; c = 0
	
	

	discriminant = (b * b) - (4 * a * c)	
	sq = Math.sqrt( discriminant )
	plus = round (-b + sq) / (2 * a);
	
	if discriminant > 0
        minus = round (-b - sq) / (2 * a)
        return "{ #{plus}, #{minus} }"
        
    if discriminant is 0 then return "{ #{plus} }"

    if discriminant < 0
        sq = Math.sqrt Math.abs( discriminant )
        real = round(-b / (2 * a))
        imaginary = round(sq / (2 * a)) + "i"
        return "{ #{real}+#{imaginary}, #{real}-#{imaginary} }"

solvePoly = ->
	polynomial = /^(\-?\d*\/?\.?\d*)[a-z]{1}\^(\-?\d+\/?\.?\d*)[+-]{1}(?:(\-?\d*\/?\.?\d*)(?:[a-z]{1}\^(\d*\/?\.?\d*))?(?:[+-]{1})?)+(\-?\d*\/?\.?\d*)?$/i
	
	#matches a possible "-" -> a possible number (int, float, frac) -> one letter a required "^" -> 
	#{ an optional "-" -> a required number -> required "+" or "-"
	#-> an optional number -> an optional letter^number -> an optional "+" or "-" } repeat as desired
	#-> an optional number
	#not necessarily desirable but prevents monotonous repetition - test for match against /^\-?\d*\/?\.?\d*[a-z]{1}\^\-?\d+\/?\.?\d*[+-]{1}$/

	
	
	