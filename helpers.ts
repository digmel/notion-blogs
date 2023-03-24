export const generateBlogCover = (blog: any) => {
  let cover = blog.cover;

  switch (cover?.type) {
    case "file":
      cover = blog.cover.file;
      break;
    case "external":
      cover = blog.cover.external.url;
      break;
  }

  return {
    id: blog.id,
    cover: cover,
    title: blog.properties.Name.title[0].plain_text,
    tags: blog.properties.Tags.multi_select,
    description: blog.properties.Description.rich_text[0].plain_text,
    date: blog.properties.Updated.last_edited_time,
    slug: blog.properties.Slug.formula.string,
  };
};
