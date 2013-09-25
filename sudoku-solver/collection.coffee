
class Collection

  constructor: ( @cells ) ->
    @candidates = '123456789'
    @matches = []

  reduce: ->
    @updateMatches()
    @removeMatches()
    @checkNumbers()

  updateMatches: ->
    for cell in @cells when cell.value
      @matches.push( cell.value )
      @candidates = @candidates.replace( cell.value, '' )

  removeMatches: ->
    for cell in @cells when isNaN( cell.value )
      for c in @matches
        cell.remove( c )

  checkNumbers: ->
    for number in @candidates
      matches = for cell in @cells when cell.candidates?.indexOf( number ) >= 0 then cell
      if matches.length is 1
        cell = matches[ 0 ]
        cell.value = number
        delete cell.candidates
        @candidates = @candidates.replace( number, '' )
        @matches.push( number )