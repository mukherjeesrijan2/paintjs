class LineMode extends Mode {
  constructor() {
    super('Line');
  }

  mouseMoved() {  }

  mousePressed() {
    if (this.activeStatus()) {
      drawing.line.push({
        stroke: drawingOptions.stroke,
        strokeWeight: drawingOptions.strokeWeight,
        x1: pen.x,
        y1: pen.y,
        x2: pen.x,
        y2: pen.y
      })

      drawingCanvas.push(
        this.show(drawing.line[drawing.line.length - 1])
      )
    }
  }

  mouseReleased() {  }

  mouseDragged() {
    if (this.activeStatus()) {
      drawing.line[drawing.line.length - 1].x2 = pen.x;
      drawing.line[drawing.line.length - 1].y2 = pen.y;
    }
  }

  show(obj) {
    return {
      draw: (screen=window) => {
        push()
        screen.stroke(obj.stroke)
        screen.strokeWeight(obj.strokeWeight)
        screen.line(obj.x1, obj.y1, obj.x2, obj.y2)
        pop()
      }
    }
  }
}
