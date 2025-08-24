
'use client';

import type { PropsWithChildren } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import FloatingButtons from '@/components/floating-buttons';
import { PublicLayoutProvider } from '@/components/layout/public-layout-provider';
import { Preloader } from '@/components/preloader';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <PublicLayoutProvider>
      {(settings, services) => (
        <>
          <Preloader settings={settings} />
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Header services={services} settings={settings} />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer services={services} settings={settings} />
            <FloatingButtons settings={settings} />
          </div>
        </>
      )}
    </PublicLayoutProvider>
  );
}
