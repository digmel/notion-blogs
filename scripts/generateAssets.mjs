import fs from "fs";
import fetch from "node-fetch";
import sharp from "sharp";
import path from "path";

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

    const targetPath = process.cwd() + "/public/assets";

    if (!fs.existsSync(targetPath)) {
      await fs.mkdir(
        path.join(process.cwd(), "/public/assets"),
        (error, info) => {
          error && console.log("Error when creating dir:", error);
          console.log("assets dir created:", info);
        }
      );
    }

    sharpImage.toFile(
      `./public/assets/${OUTPUT_IMAGE_NAME}.webp`,
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
