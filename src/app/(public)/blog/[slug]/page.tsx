import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data/static';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Insurance Plaza Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={post.image || 'https://placehold.co/1920x400.png'}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed mb-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{post.title}</h1>
                    <div className="mt-4 flex items-center justify-center gap-4 text-white/90">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                      </div>
                      <span>&bull;</span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-muted py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}

    
