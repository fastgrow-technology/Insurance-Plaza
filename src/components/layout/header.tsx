
'use client';
import { HeaderClient } from './header-client';
import type { Service, SiteSettings } from '@/lib/types';

interface HeaderProps {
    services: Pick<Service, 'slug' | 'title' | 'image' | 'short_description'>[];
    settings: SiteSettings;
}

export function Header({ services, settings }: HeaderProps) {
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { 
      href: '/services', 
      label: 'Services',
      dropdown: services.map(s => ({ href: `/services/${s.slug}`, label: s.title }))
    },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <HeaderClient navLinks={navLinks} settings={settings} />
  );
};
