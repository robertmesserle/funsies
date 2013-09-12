class Calc

  @getPointFromAngle = ( angle = 0, distance = 0, origin = { x: 0, y: 0 } ) ->
    x: distance * Math.cos( angle ) + origin.x
    y: distance * Math.sin( angle ) + origin.y

class Options

  width:  600
  height: 600

  constructor: ( options = {} ) ->
    # Set options
    for key, value of options then @[ key ] = value
    # Calculate values
    @root       ?= x: @width / 2, y: @height / 2
    @$canvas    = $( 'canvas' )
    @canvas     = @$canvas.get( 0 )
    @context    = @canvas.getContext( '2d' )

class Clock
  
  constructor: ( options ) ->
    @options  = new Options options
    @canvas   = @options.canvas
    @context  = @options.context
    @prepareCanvas()
    @addTextWrapper()
    setInterval @redraw, Math.round( 1000 / 20 )
    @redraw()
    
  prepareCanvas: =>
    @options.$canvas
      .css(  width: @options.width, height: @options.height, background: 'white' )
      .attr( width: @options.width, height: @options.height )
    
  addTextWrapper: ->
    offset = @options.$canvas.offset()
    @$text = $( '<div>' ).css
      fontFamily: 'Segoe UI Light, Helvetica Neue, sans-serif'
      fontWeight: 100
      position:   'absolute'
      top:        offset.top
      left:       offset.left
      width:      @options.width
      height:     @options.height
      lineHeight: @options.height + 'px'
      textAlign:  'center'
      color:      '#690'
    @$text.appendTo( document.body )
    @$text.append(
      @getHoursWrapper()
      @getMinutesWrapper()
    )
      
  getMinutesWrapper: ->
    @$minutes = $( '<div>' ).css
      fontSize: '15px'
      position: 'absolute'
    
  getHoursWrapper: ->
    @$hours = $( '<div>' ).css
      fontSize: '25px'
      position: 'absolute'
    
  redraw: ( now = new Date ) =>
    @context.clearRect( 0, 0, @options.width, @options.height )
    @drawInnerCircle()
    # Draw hands
    hourData = @getHourHandData( now )
    minData  = @getMinuteHandData( now, hourData )
    @drawHand( hourData, @$hours )
    @drawHand( minData, @$minutes )
    @drawSeconds( @getSecondHandData( now, minData ) )
    @$hours.html( "#{ now.getHours() % 12 or 12 }<sub>h</sub>" )
    @$minutes.html( "#{ now.getMinutes() }<sub>m</sub>" )
    
  drawInnerCircle: =>
    @context.beginPath()
    @context.arc( @options.root.x, @options.root.y, 15, 0, 2 * Math.PI )
    @context.strokeStyle = "#cf0"
    @context.stroke()
    @context.beginPath()
    @context.arc( @options.root.x, @options.root.y, 20, 0, 2 * Math.PI )
    @context.strokeStyle = "#ad0"
    @context.stroke()
    
  getAngle: ( total, parts ) =>
    parts / total * Math.PI * 2 - Math.PI / 2
    
  getSecondHandData: ( now = new Date ) =>
    ms = now.getSeconds() * 1000 + now.getMilliseconds()
    {
      angle: @getAngle( 60000, ms )
      half:  @getAngle( 60000, ms / 2 )
      radius: 95
      width: 10
      color: '#be2'
    }
    
  getMinuteHandData: ( now = new Date, hourData ) =>
    mins = now.getMinutes() * 60000 + now.getSeconds() * 1000 + now.getMilliseconds()
    {
      angle:  angle = @getAngle( 3600000, mins )
      radius: radius = 25
      start:  start = hourData.center
      inner:  inner = hourData.radius
      outer:  outer = hourData.radius + 40
      center: Calc.getPointFromAngle( angle, outer + radius, start )
    }
    
  getHourHandData: ( now = new Date ) =>
    secs  = now.getHours() % 12 * 3600 + now.getMinutes() * 60 + now.getSeconds()
    {
      angle:  angle = @getAngle( 12 * 60 * 60, secs )
      radius: radius = 30
      inner:  inner = 20
      outer:  outer = 120
      start:  start = @options.root
      center: Calc.getPointFromAngle( angle, outer + radius, start )
    }
    
  getSecondHandData: ( now = new Date, minData ) ->
    ms = now.getSeconds() * 1000 + now.getMilliseconds()
    {
      angle:  @getAngle( 60000, ms )
      outer:  minData.radius
      inner:  minData.radius - 8
      start:  minData.center
    }
  
  drawSeconds: ( data ) ->
    @context.strokeStyle = "#ad0"
    @context.fillStyle   = '#efd'
    @context.lineWidth   = 1
    @context.beginPath()
    @context.arc( data.start.x, data.start.y, data.outer, -Math.PI / 2, data.angle )
    @context.arc( data.start.x, data.start.y, data.outer - 5, data.angle, -Math.PI / 2, true )
    @context.closePath()
    @context.fill()
    @context.stroke()

  drawHandArc: ( start, inner, outer, angle ) ->
    @context.fillStyle    = '#efd'
    @context.strokeStyle  = "#ad0"
    @context.lineWidth    = 2

    @context.beginPath()
    @context.arc( start.x, start.y, outer, -Math.PI / 2, angle )
    @context.arc( start.x, start.y, inner, angle, -Math.PI / 2, true )
    @context.stroke()
    @context.fill()

  drawArcLine: ( start, inner, outer ) ->
    @context.strokeStyle  = "#ad0"
    @context.lineWidth    = 2

    p1 = Calc.getPointFromAngle( -Math.PI / 2, inner, start )
    p2 = Calc.getPointFromAngle( -Math.PI / 2, outer + 10, start )
    @context.beginPath()
    @context.moveTo( p1.x, p1.y )
    @context.lineTo( p2.x, p2.y )
    @context.stroke()

  drawHandLine: ( start, angle, inner, outer ) ->
    @context.strokeStyle  = "#ad0"
    @context.lineWidth    = 2

    p1 = Calc.getPointFromAngle( angle, inner, start )
    p2 = Calc.getPointFromAngle( angle, outer, start )
    @context.beginPath()
    @context.moveTo( p1.x, p1.y )
    @context.lineTo( p2.x, p2.y )
    @context.stroke()

  drawHandTip: ( center, radius ) ->
    @context.fillStyle    = '#fff'
    @context.strokeStyle  = "#ad0"
    @context.lineWidth    = 2

    @context.beginPath()
    @context.arc( center.x, center.y, radius, 0, Math.PI * 2 )
    @context.stroke()
    @context.fill()

  repositionElement: ( $elem, center, radius ) ->
    $elem.css
      left:       center.x - radius
      top:        center.y - radius
      width:      radius * 2
      height:     radius * 2
      lineHeight: radius * 2 + 'px'
      
  drawHand: ( data, $elem ) =>
    half = ( data.outer + data.inner ) / 2
    @drawHandArc( data.start, data.inner, half, data.angle )
    @drawArcLine( data.start, data.inner, half )
    @drawHandLine( data.start, data.angle, data.inner, data.outer )
    @drawHandTip( data.center, data.radius )
    @repositionElement( $elem, data.center, data.radius )