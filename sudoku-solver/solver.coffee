
class Solver

  constructor: ->
    @$wrapper = $( '<div>' ).appendTo( document.body )
    @reset()

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
      .text( 'Fill with Sample Puzzle (Easy)' )
      .on( 'click', @fillWithEasy )
    do =>
      $li = $( '<li>' ).appendTo( $ul )
      $( '<button>' )
      .appendTo( $li )
      .text( 'Fill with Sample Puzzle (Difficult)' )
      .on( 'click', @fillWithDifficult )

  redrawButtons: =>
    $ul = @$wrapper.find( 'ul' ).empty()
    do =>
      $li = $( '<li>' ).appendTo( $ul )
      $( '<button>' )
      .appendTo( $li )
      .text( 'Reset' )
      .on( 'click', @reset )

  reset: =>
    @$wrapper.empty()
    @drawForm()
    @drawButtons()

  fillBoard: ( board ) =>
    $inputs = @$wrapper.find( 'input' )
    for c, i in board.split( '' ) when c isnt '-' then $inputs.eq( i ).val( c )

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