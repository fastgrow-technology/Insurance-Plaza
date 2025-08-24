
'use client';

import Image from 'next/image';
import type { SiteSettings } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
    settings?: SiteSettings | null;
    className?: string;
    forFooter?: boolean;
    preloader?: boolean;
}

export const Logo = ({ settings, className, forFooter = false, preloader = false }: LogoProps) => {
  const siteName = settings?.site_name || 'Insurance Plaza';
  
  let logoUrl;

  if (preloader) {
    logoUrl = settings?.site_preloader_logo_url || settings?.site_logo_url;
  } else if (forFooter) {
    logoUrl = settings?.site_footer_logo_url || settings?.site_logo_url;
  } else {
    logoUrl = settings?.site_logo_url;
  }
  
  // Ensure logoUrl is not an empty string which can cause an error
  if (logoUrl) {
    return (
      <Link href="/" className={cn('relative inline-block h-16 w-56', className)}>
        <Image
          src={logoUrl}
          alt={siteName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("font-['Pacifico'] text-3xl text-primary", className)}>
      {siteName}
    </Link>
  );
};
