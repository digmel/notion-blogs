import fs from "fs";
import fetch from "node-fetch";
import sharp from "sharp";
import path from "path";

export const imageFormatter = async (id, imageUrl, width, height) => {
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
      width: Math.round(width / aspectRatio),
      height: Math.round(height / aspectRatio),
      fit: "outside",
    });

    // Format
    sharpImage.webp({
      quality: 100,
      smartSubsample: true,
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

    sharpImage.toFile(`./public/assets/${id}.webp`, (error, info) => {
      error && console.log("Error when writing file:", error);
      console.log("Output file details:", info);
    });
  } catch ({ message }) {
    throw new Error(`Error from imageFormatter: ${message}`);
  }
};
