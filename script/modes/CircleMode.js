class CircleMode extends Mode {
  constructor() {
    super('Circle')
  }

  mousePressed() {
    if (this.activeStatus()) {
      drawing.circle.push({
        fill: drawingOptions.fill,
        stroke: drawingOptions.stroke,
        strokeWeight: drawingOptions.strokeWeight,
        x: pen.x,
        y: pen.y,
        r: drawingOptions.circle.radius,
      })

      drawingCanvas.push(
        this.show(drawing.circle[drawing.circle.length - 1])
      )
    }
  }

  mouseReleased() {  }

  mouseDragged() {
    if (this.activeStatus()) {
      drawing.circle[drawing.circle.length - 1].x = pen.x;
      drawing.circle[drawing.circle.length - 1].y = pen.y;
    }
  }

  show(obj) {

    return {
      draw: (screen=window) => {
        push()
        if (obj.fill != null) {
          screen.fill(obj.fill);
        } else {
          screen.noFill();
        }
        screen.stroke(obj.stroke)
        screen.strokeWeight(obj.strokeWeight)
        screen.circle(obj.x, obj.y, 2 * obj.r)
        pop()
      }
    }

  }
}
