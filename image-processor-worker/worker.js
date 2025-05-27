onmessage = (e) => {
  const { type, imageData, width, height } = e.data;

  if (!imageData || !width || !height) return;

  if (type === "grayscale") {
    for (let i = 0; i < imageData.length; i += 4) {
      const avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
      imageData[i] = imageData[i + 1] = imageData[i + 2] = avg;
    }
  }

  if (type === "invert") {
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 255 - imageData[i];
      imageData[i + 1] = 255 - imageData[i + 1];
      imageData[i + 2] = 255 - imageData[i + 2];
    }
  }

  postMessage({ imageData: { data: imageData, width, height } }, [
    imageData.buffer,
  ]);
};
