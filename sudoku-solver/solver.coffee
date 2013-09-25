class Solver

  constructor: ( board ) ->
    @board = @parseBoard( board )
    @draw()

  parseBoard: ( board ) ->
    new Board( board.replace( /\s+/g, '' ).split( '' ) )

  draw: ->
    html = []
    html.push '<table>'
    for row in @board.rows
      html.push '<tr>'
      for cell in row.cells
        html.push "<td>#{ cell.value or '' }</td>"
      html.push '</tr>'
    html.push '</table>'
    document.body.innerHTML = html.join( '' )

class Board

  constructor: ( cells ) ->
    @cells  = for cell in cells then new Cell( cell )
    @rows   = @getRows()
    @cols   = @getCols()
    @blocks = @getBlocks()
    @solve()

  solve: ->
    for i in [ 1..3 ]
      for row in @rows then row.reduce()
      for col in @cols then col.reduce()
      for block in @blocks then block.reduce()

  getBlocks: ->
    for i in [ 0..8 ] then new Block @getBlock( i )

  getBlock: ( block ) ->
    r = Math.floor( block / 3 ) * 3
    c = Math.floor( block % 3 ) * 3
    cells = []
    for i in [ r .. r + 2 ]
      for j in [ c .. c + 2 ]
        cells.push( @getCell( i, j ) )
    return cells

  getRows: ->
    for i in [ 0..8 ] then new Row @getRow( i )

  getRow: ( row ) ->
    for i in [ row * 9 .. ++row * 9 - 1 ] then @cells[ i ]

  getCols: ->
    for i in [ 0..8 ] then new Column @getCol( i )

  getCol: ( col ) ->
    for cell, i in @cells when i % 9 is col then cell

  getCell: ( row, col ) ->
    @cells[ row * 9 + col % 9 ]

class Collection

  constructor: ( @cells ) ->
    @candidates = '123456789'
    @matches = []

  reduce: ->
    @updateMatches()
    @removeMatches()
    @checkCandidates()
    @checkNumbers()

  updateMatches: ->
    for cell in @cells when cell.value
      @matches.push( cell.value )
      @candidates = @candidates.replace( cell.value, '' )

  removeMatches: ->
    for cell in @cells when isNaN( cell.value )
      for c in @matches
        cell.remove( c )

  checkCandidates: ->
    for cell in @cells when cell.candidates?.length is 1
      cell.value = cell.candidates
      delete cell.candidates

  checkNumbers: ->
    for number in @candidates
      matches = for cell in @cells when not cell.value and cell.candidates?.indexOf( number ) >= 0 then cell
      if matches.length is 1
        cell = matches[ 0 ]
        cell.value = number
        delete cell.candidates
        @candidates = @candidates.replace( number, '' )
        @matches.push( number )

class Row extends Collection

class Column extends Collection

class Block extends Collection

class Cell

  constructor: ( value ) ->
    @value = value unless isNaN value
    @candidates = '123456789' unless @value

  remove: ( number ) ->
    @candidates = @candidates.replace( number, '' )

solver = new Solver """
--- --8 --4
-84 -16 ---
--- 5-- 1--

1-3 8-- 9--
6-8 --- 4-3
--2 --9 5-1

--7 --2 ---
--- 78- 26-
2-- 3-- ---
"""