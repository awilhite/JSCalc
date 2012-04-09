Number::concat = (number) ->
  number = number.toString() unless isNaN number
  str = this.toString()
  number = str.concat number
  parseInt number

numbers = 
  zero: 0
  one: 1
  two: 2
  three: 3
  four: 4
  five: 5
  six: 6
  seven: 7
  eight: 8
  nine: 9
  ten: 10
  eleven: 11
  twelve: 12
  thirteen: 13
  fourteen: 14
  fifteen: 15
  sixteen: 16
  seventeen: 17
  eighteen: 18
  nineteen: 19
  twenty: 20
  thirty: 30
  fourty: 40
  fifty: 50
  sixty: 60
  seventy: 70
  eighty: 80
  ninety: 90
  hundred: '00'
  thousand: '000'
  million: '000000'
  billion: '000000000'
  trillion: '000000000000'


number = 'twenty-five thousand five hundred two'

convert = (n) ->
  if n.match '-'
    n = n.split '-'
    return numbers[n[0]] + numbers[n[1]]
  else 
    return numbers[n]

list = number.split(' ')
number = 0;

resultlist = []

resultlist.push convert item for item in list

for item, i in resultlist
	if parseInt(item) is 0 and item isnt 0
		resultlist[i - 1] = resultlist[i - 1].concat item
		resultlist.splice(i, 1)

for item in resultlist
	number += item

