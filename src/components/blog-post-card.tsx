
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-white rounded-lg">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-t-lg">
        <Image
          src={post.image || "https://placehold.co/600x400.png"}
          alt={post.title}
          width={600}
          height={400}
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="insurance article"
        />
      </Link>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className='flex items-center gap-1.5'>
                <Calendar className="size-4" />
                <span>{post.date}</span>
            </div>
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2 flex-grow">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary leading-snug line-clamp-2 focus:outline-none">
             <span className="absolute inset-0" aria-hidden="true"></span>
            {post.title}
          </Link>
        </h3>
         <p className="text-gray-500 line-clamp-3 text-sm">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center text-sm font-semibold text-primary group-hover:underline">
          Read More <ArrowRight className="ml-1 size-4" />
        </div>
      </CardFooter>
    </Card>
  );
};
