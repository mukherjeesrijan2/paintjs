class RectangleMode extends Mode {
  constructor() {
    super('Rectangle')
  }

  mousePressed() {
    if (this.activeStatus()) {
      drawing.rectangle.push({
        fill: drawingOptions.fill,
        stroke: drawingOptions.stroke,
        strokeWeight: drawingOptions.strokeWeight,
        x: pen.x,
        y: pen.y,
        w: drawingOptions.rectangle.width,
        h: drawingOptions.rectangle.height
      })

      drawingCanvas.push(
        this.show(drawing.rectangle[drawing.rectangle.length - 1])
      )
    }
  }

  mouseReleased() {  }

  mouseDragged() {
    if (this.activeStatus()) {
      drawing.rectangle[drawing.rectangle.length - 1].x = pen.x;
      drawing.rectangle[drawing.rectangle.length - 1].y = pen.y;
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
        screen.rectMode(CENTER);
        screen.rect(obj.x, obj.y, obj.w, obj.h)
        pop()
      }
    }

  }
}
