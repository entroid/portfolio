export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="font-mono text-label uppercase tracking-label text-muted">
        Case study &quot;{slug}&quot; — under construction
      </p>
    </div>
  );
}
