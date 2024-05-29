import { PostWithTagsAndUser } from "@/types/entityRelations";
import { findAllPosts } from "@/utils/database/post.query";
import { PaginatedResult } from "@/utils/paginator";
import { MetadataRoute } from "next";

// TODO: Add all public routes to sitemap
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await findAllPosts()) as PaginatedResult<PostWithTagsAndUser>;

  const conventionalRoutes = [
    "/berita",
    "/sub-organ",
    "/tentang",
    "/kontributor",
  ].map((route) => ({
    url: `${process.env.NEXTAUTH_URL}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as
      | "yearly"
      | "monthly"
      | "never"
      | "always"
      | "hourly"
      | "daily"
      | "weekly",
  }));

  const postsRoutes = posts.data.map((post) => ({
    url: `${process.env.NEXTAUTH_URL}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly" as
      | "yearly"
      | "monthly"
      | "never"
      | "always"
      | "hourly"
      | "daily"
      | "weekly",
  }));

  return [
    {
      url: `${process.env.NEXTAUTH_URL}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: "never",
    },
    ...conventionalRoutes,
    ...postsRoutes,
  ];
}
