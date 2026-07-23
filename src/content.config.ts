import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      id: z.string().optional(),
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().min(1),
      date: z.coerce.date(),
      image: image(),
      imageAlt: z.string().optional(),
      ancestors: z.array(z.string()).min(1),
      categories: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      series: z.object({
        name: z.string().min(1),
        position: z.coerce.number().int().positive(),
      }).optional(),
      slug: z.string().min(1).optional(),
      canonical: z.url().optional(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
    }),
});

const ancestorsCollection = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "[^_]*.{md,mdx}" }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    info: z
      .object({
        school: z.url().optional(),
        teacher: z.url().optional(),
        country: z.url().optional(),
        link: z.url().optional(),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "[^_]*.{md,mdx}" }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "[^_]*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    what_i_do: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        }),
      ),
    }),
  }),
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  ancestors: ancestorsCollection,
  about: aboutCollection,
};
