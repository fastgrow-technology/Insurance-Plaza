
import { getSiteSettings } from '@/lib/data/server';
import type { MetadataRoute } from 'next';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const settings = await getSiteSettings();
    const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`;
    const defaultRules = {
        userAgent: '*',
        allow: '/',
    };

    if (settings.robots_txt && settings.robots_txt.trim() !== '') {
        // A simple parser for basic "Allow" and "Disallow" rules.
        const rules: MetadataRoute.Robots['rules'] = [];
        const lines = settings.robots_txt.split('\n');
        let currentUserAgent = '*';

        for (const line of lines) {
            const parts = line.split(':').map(p => p.trim());
            if (parts.length !== 2) continue;

            const [key, value] = parts;
            const keyLower = key.toLowerCase();

            if (keyLower === 'user-agent') {
                currentUserAgent = value;
            } else if (keyLower === 'allow' || keyLower === 'disallow') {
                 rules.push({
                    userAgent: currentUserAgent,
                    [keyLower]: value
                });
            }
        }
        
        return {
            rules,
            sitemap: sitemapUrl,
        };
    }
    
    return {
        rules: defaultRules,
        sitemap: sitemapUrl,
    };
}
    

    