import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) =>
        Rule.required().min(3).max(60).error("Title must be between 3 and 60 characters."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required().error("A main image is required."),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interiors", value: "interiors" },
          { title: "Greenscape", value: "greenscape" },
          { title: "Furniture", value: "furniture" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) =>
        Rule.max(300).warning("Keep descriptions under 300 characters for best display."),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) =>
        Rule.max(10).warning("More than 10 gallery images may slow the page. Keep it under 10."),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("Location should be concise — city and state only."),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) =>
        Rule.min(2000).max(new Date().getFullYear()).error("Enter a valid year."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "category",
    },
  },
});