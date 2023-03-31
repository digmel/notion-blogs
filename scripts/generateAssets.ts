import { imageFormatter } from "./imageFormatter.mjs";

export const generateAssets = (publishedBlogs: any, allBlocks: any) => {
  const data: any[] = [];

  publishedBlogs.forEach((blog: any, index: number) => {
    // Format blog covers
    let _imageSrc = blog?.cover;
    switch (_imageSrc?.type) {
      case "file":
        _imageSrc = blog?.cover?.file;
        break;
      case "external":
        _imageSrc = blog?.cover?.external?.url;
        break;
    }

    imageFormatter(blog.id, _imageSrc, 800, 400);

    // Format blog images
    allBlocks[index]?.results.forEach((block: any) => {
      if (block.type === "image") {
        let _imageSrc = "";
        switch (block.image.type) {
          case "file":
            _imageSrc = block.image.file?.url;
            break;
          case "external":
            _imageSrc = block.image.external?.url;
            break;
        }

        imageFormatter(block.id, _imageSrc, 800, 400);
      }
    });

    data.push({
      id: blog.id ?? "",
      cover: `/assets/${blog?.id}.webp` ?? "",
      title: blog?.properties?.Name?.title[0]?.plain_text ?? "",
      tags: blog?.properties?.Tags?.multi_select ?? "",
      description:
        blog?.properties?.Description?.rich_text[0]?.plain_text ?? "",
      date: blog?.properties?.Updated?.last_edited_time ?? "",
      slug: blog?.properties?.Slug?.formula?.string ?? "",
      blocks: allBlocks[index]?.results ?? "",
    });
  });

  return data;
};
