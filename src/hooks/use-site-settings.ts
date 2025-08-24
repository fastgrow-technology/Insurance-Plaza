
'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/lib/types';

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.from('site_settings').select('key, value');
            
            if (error) {
                console.error('Error fetching site settings:', error);
                return;
            }

            const siteSettings = data.reduce((acc, setting) => {
                acc[setting.key] = setting.value;
                return acc;
            }, {} as SiteSettings);
            setSettings(siteSettings);
        };
        fetchSettings();
    }, []);

    return settings;
}
