
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import Image from 'next/image';
import { getPageBySlug, getSiteSettings } from '@/lib/data/server';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact');
  return {
    title: page?.title || 'Contact Us | Insurance Plaza',
    description: page?.description || 'Get in touch with Insurance Plaza. Whether you have a question or need a quote, our team is ready to help. Contact us via form, phone, or email.',
  };
}

export default async function ContactPage() {
  const page = await getPageBySlug('contact');
  const content = page?.content || {};
  const settings = await getSiteSettings();
  const showSection = (section: string) => content?.[section]?.enabled !== false;

  return (
    <div className="bg-background">
      {showSection('hero') && content.hero && (
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={content.hero?.image || "https://placehold.co/1920x400.png"}
            alt="Contact Us"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="customer service representative"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-relaxed mb-6 [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.title || "Contact Us"}</h1>
                    <p className="text-xl text-white/90 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.subtitle || "We're here to help. Reach out to us with any questions or to get started on your personalized insurance plan."}</p>
                </div>
            </div>
        </div>
      </section>
      )}

      {showSection('form_section') && content.form_section && (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-4">{content.form_section?.title || "Get in Touch"}</h2>
              <p className="text-muted-foreground mb-6">
                {content.form_section?.subtitle || "Our team is available to assist you during our business hours. We look forward to hearing from you."}
              </p>
              <div className="space-y-4">
                {settings.contact_address && (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Our Office</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{settings.contact_address}</p>
                    </div>
                  </div>
                )}
                {settings.contact_phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <a href={`tel:${settings.contact_phone}`} className="text-muted-foreground hover:text-primary">{settings.contact_phone}</a>
                    </div>
                  </div>
                )}
                 {settings.contact_email && (
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <a href={`mailto:${settings.contact_email}`} className="text-muted-foreground hover:text-primary">{settings.contact_email}</a>
                    </div>
                  </div>
                 )}
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
