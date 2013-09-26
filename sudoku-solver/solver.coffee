
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
    do =>
      $li = $( '<li>' ).appendTo( $ul )
      $( '<button>' )
        .appendTo( $li )
        .text( 'Solve' )
        .on( 'click', @solveBoard )
    do =>
      $li = $( '<li>' ).appendTo( $ul )
      $( '<button>' )
      .appendTo( $li )
      .text( 'Fill with Sample Puzzle' )
      .on( 'click', @preFill )

  preFill: =>
    $inputs = @$wrapper.find( 'input' )
    $inputs.eq( 0 ).val( 8 )
    $inputs.eq( 1 ).val( 6 )
    $inputs.eq( 4 ).val( 2 )
    $inputs.eq( 12 ).val( 7 )
    $inputs.eq( 16 ).val( 5 )
    $inputs.eq( 17 ).val( 9 )
    $inputs.eq( 31 ).val( 6 )
    $inputs.eq( 33 ).val( 8 )
    $inputs.eq( 37 ).val( 4 )
    $inputs.eq( 47 ).val( 5 )
    $inputs.eq( 48 ).val( 3 )
    $inputs.eq( 53 ).val( 7 )
    $inputs.eq( 64 ).val( 2 )
    $inputs.eq( 69 ).val( 6 )
    $inputs.eq( 74 ).val( 7 )
    $inputs.eq( 75 ).val( 5 )
    $inputs.eq( 77 ).val( 9 )

  solveBoard: =>
    values = []
    @$wrapper.find( 'input' ).each -> values.push( $( @ ).val() or '-' )
    @board = @parseBoard( values.join( '' ) )
    @updateCells()

  updateCells: ->
    $inputs = @$wrapper.find( 'input' )
    for cell, index in @board.cells
      $input = $inputs.eq( index )
      if cell.value
        $input.val( cell.value )
        $input.attr( disabled: true )
        $input.addClass( 'original' ) if cell.original
      else
        $('<div>').addClass('pencil').text(cell.candidates.split('').join(' ')).appendTo($input.parent())
        $input.hide()

  parseBoard: ( board ) ->
    new Board( board )

new Solver