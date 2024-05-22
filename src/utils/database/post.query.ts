import prisma from "@/lib/prisma";
import { Post, Prisma } from "@prisma/client";
import { paginator } from "../paginator";

const paginate = paginator({ perPage: 6 });

export const findAllPosts = async (
  filter?: Prisma.PostWhereInput,
  page?: number,
) => {
  if (page) {
    return await paginate<Post, Prisma.PostFindManyArgs>(
      prisma.post,
      { page },
      {
        where: filter,
        orderBy: { published_at: "desc" },
        include: {
          tags: true,
          user: { select: { name: true, user_pic: true } },
        },
      },
    );
  }

  return await prisma.post.findMany({
    where: filter,
    orderBy: { published_at: "desc" },
    include: { tags: true, user: { select: { name: true, user_pic: true } } },
  });
};

export const findNewestPost = async (limit: number = 5) => {
  return await prisma.post.findMany({
    orderBy: { published_at: "desc" },
    take: limit,
    include: { tags: true, user: { select: { name: true, user_pic: true } } },
  });
};

export const findPopularPost = async (limit: number = 10) => {
  return await prisma.post.findMany({
    orderBy: [{ published_at: "desc" }, { view_count: "desc" }],
    take: limit,
    where: { published: true },
    include: { tags: true, user: { select: { name: true, user_pic: true } } },
  });
};

export const findPost = async (filter: Prisma.PostWhereInput) => {
  return await prisma.post.findFirst({
    where: filter,
    orderBy: { published_at: "desc" },
    include: { tags: true, user: { select: { name: true, user_pic: true } } },
  });
};
export const createPost = async (data: Prisma.PostCreateInput) => {
  return await prisma.post.create({ data });
};

export const updatePost = (
  where: Prisma.PostWhereUniqueInput,
  update: Prisma.PostUncheckedUpdateInput,
) => {
  return prisma.post.update({ where, data: update });
};

export const deletePost = async (post_id: string) => {
  return await prisma.post.delete({
    where: { id: post_id },
  });
};
