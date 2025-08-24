
'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, Instagram } from 'lucide-react';

import { Logo } from '@/components/icons/logo';
import type { Service, SiteSettings } from '@/lib/types';

interface FooterProps {
    services: Pick<Service, 'slug' | 'title' | 'image' | 'short_description'>[];
    settings: SiteSettings;
}

export function Footer({ services, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Services', href: '/services' },
    { name: 'Get a Free Quote', href: '/get-a-quote' },
  ];

  const socialLinks = [
    { name: 'facebook', icon: <Facebook /> },
    { name: 'twitter', icon: <Twitter /> },
    { name: 'linkedin', icon: <Linkedin /> },
    { name: 'instagram', icon: <Instagram /> },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Logo settings={settings} className="text-white" forFooter={true}/>
            <p className="text-gray-400">
              Your trusted partner for comprehensive insurance and financial solutions since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => {
                const isEnabled = settings[`${social.name}_enabled`] === 'true';
                const url = settings[`${social.name}_url`];
                if (isEnabled && url) {
                  return (
                    <Link key={social.name} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full text-white hover:bg-primary transition-colors">
                      {social.icon}
                    </Link>
                  )
                }
                return null;
              })}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-gray-400 hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
             <h3 className="font-semibold text-xl mb-6">Contact Info</h3>
             <div className="space-y-4 text-gray-400">
                {settings['contact_address'] && (
                    <div className="flex items-start">
                        <MapPin className="mr-3 mt-1 text-primary shrink-0" />
                        <p className="whitespace-pre-line">{settings['contact_address']}</p>
                    </div>
                )}
                {settings['contact_phone'] && (
                    <div className="flex items-center">
                        <Phone className="mr-3 text-primary" />
                        <a href={`tel:${settings['contact_phone']}`} className="hover:text-primary">{settings['contact_phone']}</a>
                    </div>
                )}
                 {settings['contact_email'] && (
                    <div className="flex items-center">
                        <Mail className="mr-3 text-primary" />
                         <a href={`mailto:${settings['contact_email']}`} className="hover:text-primary">{settings['contact_email']}</a>
                    </div>
                 )}
             </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center gap-2 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} {settings['site_name'] || 'Insurance Plaza'}. All Rights Reserved.</p>
          <p>
            Developed by{' '}
            <a
                href="https://digitechspark.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#91E125] hover:underline"
            >
                Digitech Spark
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
