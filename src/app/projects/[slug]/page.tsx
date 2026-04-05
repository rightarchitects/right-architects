import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type SanityImageAsset = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: object;
};

type Project = {
  title: string;
  year?: number;
  location?: string;
  category?: string;
  description?: string;
  mainImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
};

export const revalidate = 60;

async function getProject(slug: string): Promise<Project | null> {
  if (!slug) return null;
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      title, year, location, category, description, mainImage, gallery
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project" && defined(slug.current)]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description:
      project.description ||
      `${project.title} — a project by RIGHT Architects${project.location ? ` in ${project.location}` : ""}.`,
    openGraph: {
      title: `${project.title} | RIGHT Architects`,
      description: project.description || `${project.title} by RIGHT Architects.`,
      images: project.mainImage
        ? [{ url: urlFor(project.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const images = [project.mainImage, ...(project.gallery || [])].filter(
    (img): img is SanityImageAsset => !!img?.asset
  );

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      <div className="px-8 pt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs lowercase tracking-[0.12em] px-5 py-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
        >
          ← back
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="flex justify-center gap-6 text-xs text-neutral-500 mt-8 mb-2 lowercase tracking-[0.12em]">
          {project.year && <span>{project.year}</span>}
          {project.location && <span>{project.location}</span>}
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-12 lowercase tracking-[0.05em] text-neutral-900">
          {project.title}
        </h1>

        <div className="space-y-14">
          {images.map((image, index) => (
            <div key={index}>
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[20px] bg-neutral-100">
                <Image
                  src={urlFor(image).width(2200).height(1400).url()}
                  alt={`${project.title} — image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL={urlFor(image).width(20).height(13).blur(10).url()}
                />
              </div>
              {index === 0 && project.description && (
                <p className="mt-6 text-sm leading-relaxed text-neutral-600 w-full text-center md:text-left">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}