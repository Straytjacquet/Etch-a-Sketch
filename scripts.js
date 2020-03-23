var container = document.getElementById("container");
var gridSize = document.getElementById("gridSize");

window.addEventListener("load", makeGrid);

let colorMode = 'black';
let gridOn = true;

let mouseDown = false;
container.addEventListener("mousedown", () => {
  mouseDown = true;
});
container.addEventListener("mouseup", () => {
  mouseDown = false;
});
container.addEventListener("mouseleave", () => {
  mouseDown = false;
});

function makeGrid(){
  var totalGrid = gridSize.elements[0].value ** 2;

  if (gridSize.elements[0].value > 150) {
    alert("Grid Size is too big. Try a size < 150");

  } else if (gridSize.elements[0].value < 0) {
    alert("Grid size is too small, choose a grid size greater than 0.");

  } else {
    for(i = 0; i < totalGrid; i++) {
      var grid = document.createElement("div");
      grid.className = "gridItem";
      grid.addEventListener("mouseenter", determineColor);
      container.appendChild(grid);
    };

    container.style.gridTemplate =
    `repeat(${gridSize.elements[0].value}, 1fr) / repeat(${gridSize.elements[0].value}, 1fr)`;
    showGrid();
  };
}

function determineColor(e) {
  if (mouseDown && colorMode == "black") {
    e.target.style.backgroundColor = "black";

  } else if (mouseDown && colorMode == "color") {
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    e.target.style.backgroundColor = "rgb("+red+","+green+","+blue+")";

  } else if (mouseDown && colorMode == "grayScale") {
    var opacity = Number(event.target.style.opacity);
    e.target.style.backgroundColor = "black";
    e.target.style.opacity = opacity + 0.1;
  };
}

function showGrid() {
  const showGridInput = document.getElementById("checkbox1").checked;

  if (showGridInput == true) {
    document.querySelectorAll(".gridItem").forEach(cell => {
      cell.style.border = "1px solid black";
    });

  } else {
    document.querySelectorAll(".gridItem").forEach(cell => {
      cell.style.border = "0px";
    });
  };
}

document.getElementById("showGrid").addEventListener("change", showGrid);

document.getElementById("gridSize").addEventListener("input", () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  };
  makeGrid()
});

document.getElementById("clear").addEventListener("click", () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  };
  makeGrid()
});

document.getElementById("colorMode").addEventListener("click", () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  };
  colorMode = "color";
  makeGrid()
});

document.getElementById("grayScaleMode").addEventListener("click", () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  };
  colorMode = "grayScale";
  makeGrid()
});

document.getElementById("blackMode").addEventListener("click", () => {
  while(container.firstChild){
    container.removeChild(container.firstChild);
  };
  colorMode = "black";
  makeGrid()
});
