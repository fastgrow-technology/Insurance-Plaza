
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { getServiceBySlug } from '@/lib/data/server';
import { getServices } from '@/lib/data/static';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ServiceCard } from '@/components/service-card';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Insurance Plaza`,
    description: service.short_description,
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service, relatedServices } = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,168,53,0.1),rgba(255,255,255,0))]"></div>
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={service.image || 'https://placehold.co/1920x400.png'}
            alt={service.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint={service.slug}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-relaxed mb-6 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{service.title}</h1>
                    <p className="text-xl text-white/90 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{service.short_description}</p>
                </div>
            </div>
        </div>
      </section>
      
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
               <BreadcrumbSeparator />
               <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="py-16 md:py-24 space-y-16 md:space-y-24">
        {/* Modular Content Sections */}
        {service.content_sections?.map((section, index) => (
          <div key={index} className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={cn(section.type === 'image-text' && 'md:order-last')}>
                <h2 className="text-3xl font-bold text-secondary mb-6">{section.title}</h2>
                <div className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-secondary">
                  <div dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br />') }} />
                </div>
              </div>
              {section.type !== 'text-only' && section.image && (
                 <div className={cn(section.type === 'text-image' && 'md:order-last')}>
                   <Image 
                    src={section.image} 
                    alt={section.title} 
                    width={500} 
                    height={500} 
                    className="rounded-lg shadow-xl w-full object-cover h-[500px] aspect-square" 
                    data-ai-hint="insurance concept"
                   />
                 </div>
               )}
            </div>
          </div>
        ))}

        {/* Other Sections */}
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              {service.show_benefits && service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Key Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, index) => (
                      <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-4">
                           <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                            <CheckCircle className="size-6 text-primary" />
                           </div>
                           <CardTitle className="text-xl text-secondary">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {service.show_target_audience && service.target_audience && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-8 flex items-center gap-6">
                        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                           <Users className="size-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-secondary mb-2">Who is this for?</h3>
                            <p className="text-muted-foreground">{service.target_audience}</p>
                        </div>
                    </CardContent>
                </Card>
              )}

              {service.show_plans && service.plans && service.plans.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Our Plans</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {service.plans.map((plan, index) => (
                      <Card key={index} className="flex flex-col hover:shadow-xl transition-shadow">
                        <CardHeader className="text-center bg-muted/50 rounded-t-lg">
                          <CardTitle className="text-2xl text-secondary">{plan.name}</CardTitle>
                          <p className="text-4xl font-bold text-primary pt-2">{plan.price}</p>
                        </CardHeader>
                        <CardContent className="flex-grow p-6">
                          <ul className="space-y-3">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="size-5 text-green-500 mt-1 shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <div className="p-6 pt-0 mt-auto">
                          <Button asChild className="w-full">
                            <Link href="/get-a-quote">Choose Plan</Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {service.show_steps && service.steps && service.steps.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-secondary mb-12 text-center">How It Works</h2>
                   <div className="relative">
                     <div className="absolute left-5 top-5 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
                     {service.steps.map((step, index) => (
                       <div key={index} className="relative pl-16 mb-10">
                         <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold ring-8 ring-background">{index + 1}</div>
                         <div className="pl-4">
                            <h3 className="text-xl font-semibold text-secondary mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {service.show_faqs && service.faqs && service.faqs.length > 0 && (
                <Card>
                    <CardHeader>
                        <h2 className="text-3xl font-bold text-secondary text-center">Frequently Asked Questions</h2>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Accordion type="single" collapsible className="w-full">
                            {service.faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline text-secondary">
                                {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground pt-2">
                                {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

       {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-secondary mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let us help you find the perfect coverage. Get a free, no-obligation quote today and take the first step towards securing your peace of mind.
            </p>
            <Button asChild size="lg">
                <Link href="/get-a-quote">Get a Free Quote Now <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </section>

      {/* Related Services */}
      {service.show_related_services && relatedServices && relatedServices.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
