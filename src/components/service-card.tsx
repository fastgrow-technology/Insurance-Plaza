
'use client';

import Link from 'next/link';
import type { Service } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
  service: Pick<Service, 'slug' | 'title' | 'image' | 'short_description' | 'icon_svg'>;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={service.image || 'https://placehold.co/600x400.png'}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={service.slug}
          />
        </div>
        <CardContent className="flex flex-grow flex-col p-6 text-left">
          <h3 className="mb-2 font-bold text-lg text-gray-900">{service.title}</h3>
          <p className="mb-4 flex-grow text-sm text-muted-foreground line-clamp-3">{service.short_description}</p>
          <div className="inline-flex items-center font-semibold text-primary group-hover:underline">
            Learn More <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
