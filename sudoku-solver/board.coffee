
class Board

  constructor: ( cells ) ->
    @cells  = for cell in cells then new Cell( cell )
    @rows   = @getRows()
    @cols   = @getCols()
    @blocks = @getBlocks()
    @solve()

  solve: ->
    while @performPass() then # No loop contents, calls @performPass() until no changes are found

  performPass: ->
    results = []
    results = results.concat( for row in @rows when row.reduce() then true )
    results = results.concat( for col in @cols when col.reduce() then true )
    results = results.concat( for block in @blocks when block.reduce() then true )
    results.length

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