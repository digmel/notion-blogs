import fs from "fs";
import fetch from "node-fetch";
import sharp from "sharp";

const imageUrl =
  "https://images.unsplash.com/photo-1516307318288-46d4194fe79e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb";

const OUTPUT_IMAGE_NAME = "testImage-output";

const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 400;

const imageFormatter = async () => {
  try {
    // Fetch image buffer from url
    const res = await fetch(imageUrl);
    const resBuffer = await res.arrayBuffer();

    // Create sharpImage
    const sharpImage = sharp(resBuffer);

    // Aspect ratio
    const metadata = await sharpImage.metadata();
    const aspectRatio = Math.round(metadata.width / metadata.height);

    // Resize
    sharpImage.resize({
      width: Math.round(TARGET_WIDTH / aspectRatio),
      height: Math.round(TARGET_HEIGHT / aspectRatio),
      fit: "outside",
    });

    // Format
    sharpImage.webp({
      quality: 100,
      lossless: true,
      smartSubsample: true,
      effort: 6,
    });

    // Output
    if (!fs.existsSync("./out/assets")) {
      fs.mkdirSync("./out/assets");
      console.log("assets file is created");
    }

    sharpImage.toFile(
      `./out/assets/${OUTPUT_IMAGE_NAME}.webp`,
      (error, info) => {
        error && console.log("Error when writing file:", error);
        console.log("Output file details:", info);
      }
    );
  } catch ({ message }) {
    throw new Error(`Error from imageFormatter: ${message}`);
  }
};

imageFormatter();
