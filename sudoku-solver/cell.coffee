
class Cell

  constructor: ( value ) ->
    @value = value unless isNaN value
    @candidates = '123456789' unless @value
    @original = not @candidates

  remove: ( number ) ->
    @candidates = @candidates.replace( number, '' )