class FreeHandMode extends Mode {
  constructor() {
    super('Free Hand')
  }

  mousePressed() {
    if (this.activeStatus()) {
      drawing.free_hand.push({
        stroke: drawingOptions.stroke,
        strokeWeight: drawingOptions.strokeWeight,
        x: pen.x,
        y: pen.y,
        start: true
      })

      drawingCanvas.push(
        this.show(drawing.free_hand[drawing.free_hand.length - 1])
      )
    }
  }

  mouseReleased() {  }

  mouseDragged() {
    if (this.activeStatus()) {
      drawing.free_hand.push({
        stroke: drawingOptions.stroke,
        strokeWeight: drawingOptions.strokeWeight,
        x: pen.x,
        y: pen.y,
        start: false
      })

      drawingCanvas.push(
        this.show(drawing.free_hand[drawing.free_hand.length - 1])
      )
    }
  }

  show(obj) {

    return {
      draw: (screen=window) => {
        push()
        screen.stroke(obj.stroke)
        screen.strokeWeight(obj.strokeWeight)

        if (drawing.free_hand.indexOf(obj) == 0) {
          screen.point(obj.x, obj.y)
        } else {
          let prev = drawing.free_hand[drawing.free_hand.indexOf(obj) - 1];
          if (obj.start == true) {
            screen.point(obj.x, obj.y)
          } else {
            screen.line(prev.x, prev.y, obj.x, obj.y)
          }
        }
        pop()
      }
    }

  }
}
