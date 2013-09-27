
class Solver

  constructor: ->
    @$wrapper = $( '<div>' ).appendTo( document.body )
    @reset()

  drawBoard: ->
    $table = $( '<table>' )
    for i in [1..9]
      $row = $( '<tr>' ).appendTo( $table )
      for j in [1..9]
        $cell = $( '<td>' ).appendTo( $row )
        $( '<input>' ).attr( type: 'text' ).appendTo( $cell )
    return $table

  drawButtons: ->
    $( '<ul>' ).append(
      $( '<li>' ).append( $( '<button>' ).text( 'Solve' ).on( 'click', @solveBoard ) )
      $( '<li>' ).append( $( '<button>' ).text( 'Fill with Sample (Easy)' ).on( 'click', @fillWithEasy ) )
      $( '<li>' ).append( $( '<button>' ).text( 'Fill with Sample (Difficult)' ).on( 'click', @fillWithDifficult ) )
    )

  redrawButtons: =>
    @$wrapper.find( 'ul' ).empty().append(
      $( '<li>' ).append( $( '<button>' ).text( 'Reset' ).on( 'click', @reset ) )
    )

  reset: =>
    @$wrapper.empty().append( @drawBoard(), @drawButtons() )

  fillBoard: ( board ) =>
    $inputs = @$wrapper.find( 'input' )
    for c, i in board.split( '' )
      $inputs.eq( i ).val( if c is '-' then '' else c )

  fillWithEasy: =>
    @fillBoard '-----8--4-84-16------5--1--1-38--9--6-8---4-3--2--95-1--7--2------78-26-2--3-----'

  fillWithDifficult: =>
    @fillBoard '86--2-------7---59-------------6-8---4---------53----7----------2----6----75-9---'

  solveBoard: =>
    values = []
    @$wrapper.find( 'input' ).each -> values.push( $( @ ).val() or '-' )
    @board = @parseBoard( values.join( '' ) )
    @updateCells()
    @redrawButtons()

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