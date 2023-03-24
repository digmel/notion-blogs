export const GET_PUBLISHED_BLOGS_CONFIG: any = {
  database_id: process.env.NOTION_BLOG_DATABASE_ID,
  filter: {
    property: "Published",
    checkbox: {
      equals: true,
    },
  },
  sorts: [
    {
      property: "Updated",
      direction: "descending",
    },
  ],
};
