// stores the modes that have initialized
// to be used for various purposes such as
// debugging etc
let available_modes = [];

// stores the shapes based on the type
// types example: line, circle, free_hand etc
let drawing = {}

// options related to pen stroke, strokeWeight
// and other options related to shapes
let drawingOptions = {
  fill: null,
  stroke: 0,
  strokeWeight: 2,

  circle: {
    radius: 100
  },

  rectangle: {
    width: 200,
    height: 150
  },

  eraser: {
    types: {
      rect: {
        width: 100,
        height: 100,
        fill: null,
        stroke: 10,
        strokeWeight: 2
      }
    },

    activeType: 'rect'
  }
}

// stores all the shapes in order
let drawingCanvas = [];

// pen
let pen = {
  down: false,
  x: null,
  y: null
}

// menu sidebar
let menu;

// modes
let lineMode;
let circleMode;
let rectangleMode;
let freeHandMode;
let eraserMode;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);

  menu = new Menu();

  lineMode = new LineMode();
  circleMode = new CircleMode();
  rectangleMode = new RectangleMode();
  freeHandMode = new FreeHandMode();
  eraserMode = new EraserMode();

  menu.register(lineMode.getOption());
  menu.register(circleMode.getOption());
  menu.register(rectangleMode.getOption());
  menu.register(freeHandMode.getOption());
  menu.register(eraserMode.getOption());

  freeHandMode.activeStatus(true);

  initializeDrawing();

}

function initializeDrawing() {
  for (let mode of available_modes) {

    let modeAlias = mode.toLowerCase().replace(' ', '_');
    drawing[modeAlias] = [];
  }
}

function mouseMoved() {

  if (mouseX < width - menu.w) {
    pen.x = mouseX;
    pen.y = mouseY;
  }

  menu.mouseMoved();
}

function mousePressed() {

  // dont start drawing below the menu
  if (mouseX < width - menu.w) {
    pen.down = true;

    lineMode.mousePressed();
    circleMode.mousePressed();
    freeHandMode.mousePressed();
    rectangleMode.mousePressed();
    eraserMode.mousePressed();
  }

  menu.mousePressed();
}

function mouseReleased() {
  pen.down = false;
}

function mouseDragged() {
  pen.x = mouseX;
  pen.y = mouseY;

  if (pen.down) {
    lineMode.mouseDragged();
    circleMode.mouseDragged();
    freeHandMode.mouseDragged();
    rectangleMode.mouseDragged();
    eraserMode.mouseDragged();
  }
}

function draw() {
  background(250, 250, 200);

  for (let obj of drawingCanvas) {
    obj.draw();
  }

  eraserMode.show();

  stroke(255, 0, 0)
  strokeWeight(8);
  point(pen.x, pen.y);

  menu.show();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}













// TESTING SAVING

function keyPressed() {
  if (key == 's') {

    let graphics = createGraphics(width - menu.w, height);
    graphics.background(250, 250, 200);

    for (let obj of drawingCanvas) {
      obj.draw(graphics);
    }

    save(graphics, 'image.jpg');
  }
}
