
class Solver

  constructor: ->
    @$wrapper = $( '<div>' ).appendTo( document.body )
    @drawForm()
    @drawButtons()

  drawForm: ->
    $table = $( '<table>' ).appendTo( @$wrapper )
    for i in [1..9]
      $row = $( '<tr>' ).appendTo( $table )
      for j in [1..9]
        $cell = $( '<td>' ).appendTo( $row )
        $( '<input>' ).attr( type: 'text' ).appendTo( $cell )

  drawButtons: ->
    $ul = $( '<ul>' ).appendTo( @$wrapper )
    $li = $( '<li>' ).appendTo( $ul )
    $( '<button>' )
      .appendTo( $li )
      .text( 'Solve' )
      .on( 'click', @solveBoard )

  solveBoard: =>
    values = []
    @$wrapper.find( 'input' ).each -> values.push( $( @ ).val() or '-' )
    @board = @parseBoard( values.join( '' ) )
    @updateCells()

  updateCells: ->
    $inputs = @$wrapper.find( 'input' )
    for cell, index in @board.cells
      $input = $inputs.eq( index )
      $input.val( cell.value )
      $input.attr( disabled: true )
      $input.addClass( 'original' ) if cell.original

  parseBoard: ( board ) ->
    new Board( board )

new Solver