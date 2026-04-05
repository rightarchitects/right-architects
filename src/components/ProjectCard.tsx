"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  location: string;
  category: string;
  mainImage: any;
  gallery?: any[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const allImages = [project.mainImage, ...(project.gallery ?? [])].filter(
    (img) => img?.asset
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <Link href={`/projects/${project.slug.current}`} className="group">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-200 shadow-sm">
        <div className="relative w-full aspect-square">
          {allImages.map((img, i) => (
            <Image
              key={i}
              src={urlFor(img).width(1000).height(1000).url()}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className={`object-cover transition-opacity duration-700 ${
                i === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Dot indicators */}
        {allImages.length > 1 && (
          <div className="absolute top-3 left-0 right-0 flex justify-center gap-1">
            {allImages.map((_, i) => (
              <span
                key={i}
                className={`block h-1 w-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-20 lg:h-24 bg-gradient-to-t from-white/90 via-white/60 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <h2 className="text-sm md:text-base lg:text-lg font-light tracking-tight">
            {project.title}
          </h2>
        </div>
      </div>
    </Link>
  );
}