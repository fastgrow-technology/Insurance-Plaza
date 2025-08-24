
import type { Metadata } from 'next';
import { Mail, Phone, Building } from 'lucide-react';
import Image from 'next/image';
import { QuoteForm } from './quote-form';
import { getPageBySlug } from '@/lib/data/server';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('get-in-touch');
  return {
    title: page?.title || 'Get Your Free Quote - Insurance Plaza | Quick & Easy',
    description: page?.description || 'Get a free, personalized insurance quote from Insurance Plaza. Quick online form, expert advice, and competitive rates for all your insurance needs.',
  };
}


export default async function GetAQuotePage() {
    const page = await getPageBySlug('get-in-touch');
    const content = page?.content || {};

    const benefits = [
        { icon: <Mail className="size-5 text-white" />, text: content.benefits?.benefit_1 || 'Get quotes in 5 minutes' },
        { icon: <Phone className="size-5 text-white" />, text: content.benefits?.benefit_2 || '100% secure & confidential' },
        { icon: <Building className="size-5 text-white" />, text: content.benefits?.benefit_3 || 'No fees or obligations' },
    ];

    return (
        <div className="bg-background">
             <section className="relative">
                <div className="absolute inset-0">
                    <Image
                        src={content.hero?.image || "https://placehold.co/1920x600.png"}
                        alt="Get a Quote"
                        layout="fill"
                        objectFit="cover"
                        className="z-0"
                        data-ai-hint="call center team"
                    />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#77A835]/50" />
                </div>
                <div className="relative container mx-auto px-4 py-24 text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.title || "Get Your Free Insurance Quote"}</h1>
                    <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">{content.hero?.subtitle || "Quick, easy, and personalized quotes from Canada's trusted insurance experts. No obligation, no hidden fees."}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                        {benefits.map(benefit => (
                            <div key={benefit.text} className="flex items-center justify-center">
                                {benefit.icon}
                                <span className="ml-3">{benefit.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <QuoteForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
