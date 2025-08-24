
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './icons/logo';
import { usePathname } from 'next/navigation';
import type { SiteSettings } from '@/lib/types';

interface PreloaderProps {
    settings: SiteSettings | null;
}

export function Preloader({ settings }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) {
      setIsLoading(false);
      return;
    }

    // Set loading to true on path change
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [isAdminRoute, pathname]);

  if (isAdminRoute || !settings) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Logo settings={settings} preloader={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
