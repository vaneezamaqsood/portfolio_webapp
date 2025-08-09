import ProjectDetail from "@/components/ProjectDetail";
import { workItems } from "@/data/work";
import type { Metadata } from "next";

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const item = workItems.find((w) =>
    w.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === decoded
  );
  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="text-muted-foreground mt-2">The project you’re looking for doesn’t exist.</p>
      </div>
    );
  }
  return <ProjectDetail item={item} />;
}

export function generateStaticParams() {
  return workItems.map((w) => ({
    slug: w.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const item = workItems.find((w) =>
    w.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === decoded
  );
  if (!item) {
    return {
      title: "Project Not Found",
      description: "The project you’re looking for doesn’t exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = item.subtitle ? `${item.title}: ${item.subtitle}` : item.title;
  const description = item.subtitle
    ? `${item.title} — ${item.subtitle}`
    : `${item.title} — Project detail by Vaneeza M`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${decoded}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/work/${decoded}`,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}


