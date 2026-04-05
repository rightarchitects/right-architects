import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    category,
    location,
    year,
    mainImage,
    gallery
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    featuredProjects[]->{
      _id,
      title,
      slug,
      "imageUrl": mainImage.asset->url
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    year,
    location,
    category,
    description,
    mainImage,
    gallery
  }
`;