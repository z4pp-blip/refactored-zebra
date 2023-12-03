const Tesseract = require('tesseract.js');
const Jimp = require('jimp');

async function processCheckImage(imagePath) {
  try {
    // Load the image using Jimp
    const image = await Jimp.read(imagePath);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE); // You can choose a different font and size
    image.print(
      font,
      10,
      10,
      "Hello world that wraps!",
      50,
      (err, image, { x, y }) => {
        image.print(font, x, y + 20, "More text on another line", 50);
      }
    );
    
    image.color([
      { apply: 'saturate', params: [25] }
    ])
    // Perform any necessary image processing (resize, enhance, etc.) using Jimp methods

    // Save the processed image
    const processedImagePath = 'processed_check.png';
    await image.writeAsync(processedImagePath);

    // Use Tesseract.js for OCR
    const { data: { text } } = await Tesseract.recognize(
      processedImagePath,
      'eng', // Language
      {
        logger: info => console.log(info) // Optional logger
      }
    );

    console.log('OCR Result:', text);
  } catch (error) {
    console.error('Error processing check image:', error.message);
  }
}

// Replace 'check.png' with the path to your actual check image
processCheckImage('check.png');
