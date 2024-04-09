import { createCanvas, loadImage } from 'canvas';

export async function isBlankSignature(base64String: string) {
    try {
      // Decode base64 string to buffer
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
  
      // Load image from buffer
      const image = await loadImage(buffer);
  
  
      // Create a canvas with the same dimensions as the image
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
  
      // Draw the image onto the canvas
      ctx.drawImage(image, 0, 0);
  
      // Get the image data from the canvas
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const pixels = imageData.data;
  
      // Calculate the average color value of the image
      let totalColor = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        // We skip alpha channel (every 4th value) as we are only interested in RGB
        totalColor += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3; // Average of RGB values
      }
      const averageColor = totalColor / (pixels.length / 4);
  
  
      // Check if the average color is close to white (indicating a blank image)
      const threshold = 255; // Adjust this threshold as needed
      const isBlank = averageColor >= threshold;
  
  
      // Return true if the image is blank, false otherwise
      return isBlank;
    } catch (error) {
      console.error('Error:', error);
      return false; // If an error occurs, assume the image is not blank
    }
  }
  