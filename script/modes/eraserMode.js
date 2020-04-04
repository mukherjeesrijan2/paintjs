class EraserMode extends Mode {
  constructor() {
    super('Eraser')
  }

  mousePressed() {
    if (this.activeStatus()) {
      this.erase();
    }
  }

  mouseDragged() {
    if (this.activeStatus()) {
      this.erase();
    }
  }

  erase() {
    let x = pen.x, y = pen.y;

    drawingCanvas.push(
      {
        draw: () => {
          push()

          if (drawingOptions.eraser.activeType == 'rect') {
            fill(250, 250, 200)
            noStroke();
            rectMode(CENTER);
            rect(x, y,
              drawingOptions.eraser.types[drawingOptions.eraser.activeType].width,
              drawingOptions.eraser.types[drawingOptions.eraser.activeType].height
            )
          }
          pop()
        }
      }
    )

  }

  show() {

    if (this.activeStatus()) {

      push()
      if (drawingOptions.eraser.activeType == 'rect') {

        if (drawingOptions.eraser.types.rect.fill == null) {
          noFill()
        } else {
          fill(drawingOptions.eraser.types.rect.fill)
        }

        stroke(drawingOptions.eraser.types.rect.stroke)
        strokeWeight(drawingOptions.eraser.types.rect.strokeWeight)

        rectMode(CENTER);
        rect(pen.x, pen.y,
              drawingOptions.eraser.types.rect.width,
              drawingOptions.eraser.types.rect.height)
      }

      pop()
    }

  }
}
