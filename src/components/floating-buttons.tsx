
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/lib/types';
import { usePathname } from 'next/navigation';

interface FloatingButtonsProps {
  settings: SiteSettings;
}

const FloatingButtons = ({ settings }: FloatingButtonsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { whatsapp_enabled, whatsapp_recipient_number } = settings;
  const showQuoteButton = pathname !== '/get-a-quote';

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
       {showQuoteButton && (
        <Link href="/get-a-quote" className={cn(
           "flex h-14 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-110"
        )}>
            <span className="font-body">Get a Free Quote</span>
        </Link>
       )}
      {whatsapp_enabled === 'true' && whatsapp_recipient_number && (
         <Link href={`https://wa.me/${whatsapp_recipient_number}`} target="_blank" className="whatsapp-float size-14 transition-transform hover:scale-110" aria-label="Contact us on WhatsApp">
            <WhatsappIcon className="size-8"/>
        </Link>
      )}
    </div>
  );
};

export default FloatingButtons;
