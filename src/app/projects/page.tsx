import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/queries";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse architecture, interior, greenscape, and furniture projects by RIGHT Architects.",
};

export const revalidate = 60;

type SanityImageAsset = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: object;
};

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  location: string;
  category: string;
  mainImage: SanityImageAsset;
  gallery?: SanityImageAsset[];
};

export default async function ProjectsPage() {
  const projects: Project[] = await client.fetch(projectsQuery, {}, {
    next: { revalidate: 60 },
  });

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-black">
      <Header />
      <div className="h-46 md:h-54 lg:h-56" />
      <section className="mx-auto max-w-[1800px] px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}