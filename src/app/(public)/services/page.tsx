
import type { Metadata } from 'next';
import { getServices, getPageBySlug } from '@/lib/data/static';
import { ServiceCard } from '@/components/service-card';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services');
  return {
    title: page?.title || 'Our Services | Insurance Plaza',
    description: page?.description || 'Explore our wide range of insurance services, including life, health, auto, and home insurance. Find the perfect plan to protect what matters most to you.',
  };
}

export default async function ServicesPage() {
  const services = await getServices();
  const page = await getPageBySlug('services');
  const content = page?.content || {};
  
  return (
    <div className="bg-background">
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={content.hero?.image || "https://placehold.co/1920x400.png"}
            alt="Our Services"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="financial planning meeting"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-relaxed mb-6 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.title || "Our Insurance Services"}</h1>
                    <p className="text-xl text-white/90 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.subtitle || "We offer a comprehensive suite of insurance products designed to provide you with security and peace of mind. Browse our offerings to find the coverage that's right for you."}</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

    
