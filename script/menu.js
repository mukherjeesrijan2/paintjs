class Menu {
  constructor(w=50) {
    this.w  = w;
    this.bg = [250, 218, 94];

    this.margins = {
      cell: {
        x: 10,
        y: 10
      }
    }

    // options registered with the menu
    this.options = [];

    // option the mouse is over
    this.showLabelOf = null;

  }

  /**
  register(option)

  @param option Object

  registers the option with the menu
  */
  register(option) {

    this.options.push(option)

  }

  mouseMoved() {


    this.showLabelOf = this.getOptionFromPos(mouseX, mouseY);

    if (this.showLabelOf == null) {
      cursor(ARROW);
    } else {
      cursor(HAND);
    }


  }

  mousePressed() {

    if (this.showLabelOf != null) {
      if (this.showLabelOf.active()) {
        this.showLabelOf.deactivate();
      } else {
        this.showLabelOf.activate();

        // deactivate other buttons
        this.deactivateOtherOptions(this.showLabelOf);
      }
    }

  }

  deactivateOtherOptions(option) {

    for (let op of this.options) {
      if (op != option) {
        op.deactivate();
      }
    }

  }

  getOptionFromPos(x, y) {

    let option = null;

    let sx = width - this.w;
    let sy = 0;

    let mx = this.margins.cell.x;
    let my = this.margins.cell.y;

    let size = this.w;

    for (let op of this.options) {

      if (x >= sx + mx / 2 && x <= sx + size - mx / 2 &&
          y >= sy + my / 2 && y <= sy + size - my / 2) {

        option = op;
        break;
      }


      sy += size;

    }

    return option

  }

  /**
  __showOptions()

  show the options as boxes
  if the mouse is over an option expand and show the full text
  */
  __showOptions() {
    let x = width - this.w;
    let size = this.w;
    let y = 0;

    let mx = this.margins.cell.x;
    let my = this.margins.cell.y;

    push()
    for (let option of this.options) {
      textSize(16);

      stroke(0);
      strokeWeight(2);

      if (option.active()) {
        fill(255, 170, 29)
      } else {
        fill(255, 229, 124)
      }

      if (this.showLabelOf == option) { // mouse is over this label
        rect(x + mx/2 - textWidth(option.label), y + my / 2,
            size - mx + textWidth(option.label), size - my);
      } else {
        rect(x + mx/2, y + my/2, size - mx, size - my);
      }


      fill(0);
      stroke(255);
      strokeWeight(5);
      textAlign(CENTER, CENTER);

      if (this.showLabelOf == option) { // mouse is over this label
        text(option.label,
            x + mx/2 - textWidth(option.label), y + my/2,
            size - mx + textWidth(option.label), size - my)
      } else {
        text(option.label.charAt(0), x + mx/2, y + my/2, size - mx, size - my)
      }


      y += size;
    }
    pop()
  }

  show() {

    push()
    // background
    fill(this.bg[0], this.bg[1], this.bg[2])
    noStroke()
    rect(width - this.w, 0, this.w, height);

    this.__showOptions(); // show the options
    pop()

  }
}
