
'use client';
import { Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPostCard } from '@/components/blog-post-card';
import { ServiceCard } from '@/components/service-card';
import { getTestimonials, getSiteSettings, getPageBySlug } from '@/lib/data/server';
import { getServices, getBlogPosts } from '@/lib/data/static';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContactForm } from '@/components/contact-form';
import { Check, Quote } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { Page, Testimonial, Service, SiteSettings, BlogPost as BlogPostType } from '@/lib/types';
import Autoplay from "embla-carousel-autoplay"


export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState<Page | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  useEffect(() => {
    async function fetchData() {
        const [servicesData, blogPostsData, testimonialsData, pageData, settingsData] = await Promise.all([
            getServices(),
            getBlogPosts(3),
            getTestimonials(),
            getPageBySlug('home'),
            getSiteSettings()
        ]);
        setServices(servicesData as any[]);
        setBlogPosts(blogPostsData);
        setTestimonials(testimonialsData);
        setPage(pageData);
        setSettings(settingsData);
    }
    fetchData();
  }, []);
  
  if (!page || !settings) {
    return null; // Or some loading state
  }

  const content = page?.content || {};
  
  const stats = content.stats?.items || [
    { value: '15+', label: 'Years of Experience' },
    { value: '5,000+', label: 'Happy Clients' },
    { value: '9', label: 'Insurance Products' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const aboutFeatures = content.about?.features || [
    { text: 'Travel Protection' },
    { text: '24/7 Support' },
    { text: 'Convertible Policies' },
    { text: 'Easy Claims' },
  ];

  const showSection = (section: string) => content?.[section]?.enabled !== false;

  return (
    <div className="flex flex-col">
      {showSection('hero') && content.hero && (
        <section id="home" className="relative">
          <div className="absolute inset-0">
            <Image
              src={content.hero?.image || "https://placehold.co/1920x700.png"}
              alt="Happy family"
              layout="fill"
              objectFit="cover"
              className="z-0"
              data-ai-hint="happy family outdoors"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
          </div>
          <div className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
              <div className="container mx-auto px-4 py-16">
                  <div className="max-w-2xl">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug md:leading-snug lg:leading-[1.2] [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.title || "Protecting What Matters Most to You"}</h1>
                      <p className="text-xl text-white/90 mb-8 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.subtitle || "Comprehensive insurance solutions tailored to your unique needs. Get peace of mind knowing you're covered for life's unexpected moments."}</p>
                      <div className="flex flex-wrap gap-4">
                          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                            <Link href="/get-a-quote">Get a Free Quote</Link>
                          </Button>
                          <Button asChild size="lg" variant="default" className="bg-primary border-primary text-primary-foreground hover:bg-transparent hover:text-white hover:border-white border">
                            <Link href="#services">Explore Services</Link>
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      )}

      {showSection('services') && content.services && (
        <section id="services" className="py-20 bg-white relative overflow-hidden">
           <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,168,53,0.15),rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.services?.title || "Our Insurance Services"}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.services?.subtitle || "Discover our comprehensive range of insurance and financial solutions designed to protect you and your loved ones."}</p>
            </div>
             <Carousel
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {services.map((service) => (
                  <CarouselItem key={service.slug} className="md:basis-1/2 lg:basis-1/3">
                     <div className="p-1 h-full">
                       <ServiceCard service={service} />
                     </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
              <CarouselNext className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90" />
            </Carousel>
          </div>
        </section>
      )}

      {showSection('about') && content.about && (
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                  <div className="w-full lg:w-1/2">
                      <Image src={content.about?.image || "https://placehold.co/800x600.png"} alt="About Insurance Plaza" width={800} height={600} className="rounded-xl shadow-xl w-full h-auto object-cover" data-ai-hint="team collaborating office"/>
                  </div>
                  <div className="w-full lg:w-1/2">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{content.about?.title || "About Insurance Plaza"}</h2>
                      <p className="text-lg text-gray-600 mb-6">{content.about?.text || "For over 15 years, Insurance Plaza has been a trusted name in the Canadian insurance industry. We specialize in providing personalized insurance and financial solutions that protect what matters most to our clients."}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-8">
                         {aboutFeatures.map((feature: {text: string}) => (
                             <div key={feature.text} className="flex items-center gap-3">
                                  <div className="flex-shrink-0 flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary">
                                      <Check className="size-4" />
                                  </div>
                                  <span className="font-semibold text-gray-700">{feature.text}</span>
                             </div>
                         ))}
                      </div>
                      <Button asChild className="mt-8">
                         <Link href="/about">Learn More About Us</Link>
                      </Button>
                  </div>
              </div>
          </div>
        </section>
      )}

      {showSection('testimonials') && content.testimonials && (
        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.testimonials?.title || "What Our Clients Say"}</h2>
               <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.testimonials?.subtitle || "Hear from our satisfied clients about their experience with Insurance Plaza."}</p>
            </div>
            <Carousel
              opts={{ align: 'start', loop: true }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4 h-full">
                      <Card className="p-8 h-full flex flex-col justify-between shadow-lg bg-gray-50 rounded-xl">
                        <div className="flex-grow">
                           <Quote className="size-8 text-primary/50" />
                          <p className="text-gray-600 italic mt-4">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                             <div className="flex text-yellow-400 mt-1">
                              {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
                             </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </section>
      )}

      {showSection('stats') && content.stats && (
        <section className="py-20 relative bg-fixed bg-cover bg-center" style={{backgroundImage: `url('${content.stats?.background_image || "https://placehold.co/1920x400.png"}')`}} data-ai-hint="business people handshake">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {stats.map((stat: {value: string; label: string}) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {showSection('blog') && content.blog && (
        <section id="blog" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.blog?.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.blog?.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <BlogPostCard key={index} post={post} />
                ))}
             </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {showSection('newsletter') && content.newsletter && (
        <section id="newsletter" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.newsletter?.title}</h2>
                 <p className="text-lg text-gray-600 mb-8">{content.newsletter?.subtitle}</p>
                  <NewsletterForm />
              </div>
          </div>
        </section>
      )}
      
      {showSection('contact') && content.contact && (
        <section id="contact" className="py-20 bg-white">
           <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.contact?.title}</h2>
                 <p className="text-lg text-gray-600 max-w-3xl mx-auto">{content.contact?.subtitle}</p>
              </div>
               <div className="mt-12 max-w-7xl mx-auto">
                  <Card className="p-4 sm:p-8 shadow-none border-0">
                     <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row gap-12 bg-gray-50 p-8 rounded-lg">
                          <div className="w-full lg:w-1/2">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
                            <ContactForm />
                          </div>
                          <div className="w-full lg:w-1/2">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Location</h3>
                             {settings['contact_map_html'] ? (
                                <div dangerouslySetInnerHTML={{ __html: settings['contact_map_html']}} className="[&>iframe]:w-full [&>iframe]:h-[450px] [&>iframe]:rounded-lg [&>iframe]:overflow-hidden" />
                             ) : (
                              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22155289.037592396!2d-105.70889426604336!3d47.32404598768217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x70f8425629621e09!2sOntario%2C%20Canada!5e0!3m2!1sen!2sin!4v1752248222327!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-lg overflow-hidden"></iframe>
                             )}
                          </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
           </div>
        </section>
      )}
    </div>
  );
}
