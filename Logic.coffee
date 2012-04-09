polynomial = /^(\-?\d*\/?\.?\d*)[a-z]{1}\^(\-?\d+\/?\.?\d*)[+-]{1}(?:(\-?\d*\/?\.?\d*)(?:[a-z]{1}\^(\d*\/?\.?\d*))?(?:[+-]{1})?)+(\-?\d*\/?\.?\d*)?$/i
	
	#matches a possible "-" -> a possible number (int, float, frac) -> one letter a required "^" -> 
	#{ an optional "-" -> a required number -> required "+" or "-"
	#-> an optional number -> an optional letter^number -> an optional "+" or "-" } repeat as desired
	#-> an optional number
	#not necessarily desirable but prevents monotonous repetition - test for match against /^\-?\d*\/?\.?\d*[a-z]{1}\^\-?\d+\/?\.?\d*[+-]{1}$/

	
	
number = XRegExp.build '-?{{fraction}}|{{decimal}}|{{int}}|{{scNot}}|{{complex}}', {
    int: /[0-9]+/
    fraction: XRegExp.build '', {
        number: /-?\d+(?:\.\d+)?/
    }
	decimal: /([0-9]+|)\.[0-9]+/
	scNot: /(([0-9]+|).[0-9]{2}\s?[xX]{1}\s?10^[0-9]+|([0-9]+|).[0-9]{2}[eE]{1}[0-9]+)/
}

