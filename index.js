//canvas name : myPics
const myPics = document.getElementById("myPics");
const context = myPics.getContext("2d");

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

// event.offsetX, event.offsetY gives the x and y coordinates of the mouse drawn shape

myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    console.log(x, y);
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;

    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

//uploading image from users computer
const reader = new FileReader();
const img = new Image();
const uploadImage = (e) => {
  reader.onload = () => {
    img.onload = () => {
      // myPics.width = img.width;
      // myPics.height = img.height;
      myPics.width = img.naturalWidth;
      myPics.height = img.naturalHeight;
      context.drawImage(img, 0, 0, myPics.width, myPics.height);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
};

const imageLoader = document.getElementById("uploader");
imageLoader.addEventListener("change", uploadImage);
