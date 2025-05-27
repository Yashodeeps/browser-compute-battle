const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");

const worker = new Worker("worker.js");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  img.src = URL.createObjectURL(file);
});

function processImage(type) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  worker.postMessage(
    {
      type: type,
      imageData: imageData.data,
      width: imageData.width,
      height: imageData.height,
    },
    [imageData.data.buffer]
  );
}

worker.onmessage = (e) => {
  const { imageData } = e.data;
  ctx.putImageData(
    new ImageData(
      new Uint8ClampedArray(imageData.data),
      imageData.width,
      imageData.height
    ),
    0,
    0
  );
};
