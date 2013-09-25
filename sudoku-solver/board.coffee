
class Board

  constructor: ( cells ) ->
    @cells  = for cell in cells then new Cell( cell )
    @rows   = @getRows()
    @cols   = @getCols()
    @blocks = @getBlocks()
    @solve()

  solve: ->
    for i in [ 1..81 ]
      for row in @rows then row.reduce()
      for col in @cols then col.reduce()
      for block in @blocks then block.reduce()

  getBlocks: ->
    for i in [ 0..8 ] then new Collection @getBlock( i )

  getBlock: ( block ) ->
    r = Math.floor( block / 3 ) * 3
    c = Math.floor( block % 3 ) * 3
    cells = []
    for i in [ r .. r + 2 ]
      for j in [ c .. c + 2 ]
        cells.push( @getCell( i, j ) )
    return cells

  getRows: ->
    for i in [ 0..8 ] then new Collection @getRow( i )

  getRow: ( row ) ->
    for i in [ row * 9 .. ++row * 9 - 1 ] then @cells[ i ]

  getCols: ->
    for i in [ 0..8 ] then new Collection @getCol( i )

  getCol: ( col ) ->
    for cell, i in @cells when i % 9 is col then cell

  getCell: ( row, col ) ->
    @cells[ row * 9 + col % 9 ]