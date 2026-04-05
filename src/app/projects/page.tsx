// app/projects/page.tsx
import { client } from "@/sanity/client";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  location: string;
  category: string;
  mainImage: any;
  gallery?: any[];         // 👈 added
};

async function getProjects(): Promise<Project[]> {
  return client.fetch(`
    *[_type == "project"] | order(year desc) {
      _id,
      title,
      slug,
      year,
      location,
      category,
      mainImage,
      gallery           
    }
  `);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

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