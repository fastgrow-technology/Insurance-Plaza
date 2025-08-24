
import { getSiteSettings } from '@/lib/data/server';
import { getServices } from '@/lib/data/static';
import type { Service, SiteSettings } from '@/lib/types';
import { useEffect, useState } from 'react';

interface PublicLayoutProviderProps {
  children: (settings: SiteSettings, services: Pick<Service, 'slug' | 'title' | 'image' | 'short_description' | 'icon_svg'>[]) => React.ReactNode;
}

export function PublicLayoutProvider({ children }: PublicLayoutProviderProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Pick<Service, 'slug' | 'title' | 'image' | 'short_description' | 'icon_svg'>[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [settingsData, servicesData] = await Promise.all([
        getSiteSettings(),
        getServices(),
      ]);
      setSettings(settingsData);
      setServices(servicesData);
    }
    fetchData();
  }, []);

  if (!settings || !services) {
    return null; // Or a loading spinner
  }

  return <>{children(settings, services)}</>;
}
