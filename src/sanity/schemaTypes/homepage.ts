import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(4)
          .error("Select between 1 and 4 featured projects."),
    }),
  ],
});