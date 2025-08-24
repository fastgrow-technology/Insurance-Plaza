
'use client';

import { updateSiteSettings } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MediaPicker } from '../media/media-picker';
import { useEffect, useState } from 'react';
import { generateSitemapAction } from '@/lib/actions/sitemap';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface SettingsFormProps {
    initialSettings: Record<string, string>;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram'];
  const homepageSections = ['services', 'about', 'testimonials', 'stats', 'blog', 'newsletter', 'contact'];
  const [logoUrl, setLogoUrl] = useState('');
  const [footerLogoUrl, setFooterLogoUrl] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [preloaderLogoUrl, setPreloaderLogoUrl] = useState('');
  const [isGeneratingSitemap, setIsGeneratingSitemap] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLogoUrl(initialSettings['site_logo_url'] || '');
    setFooterLogoUrl(initialSettings['site_footer_logo_url'] || '');
    setFaviconUrl(initialSettings['site_favicon_url'] || '');
    setPreloaderLogoUrl(initialSettings['site_preloader_logo_url'] || '');
  }, [initialSettings]);

  const handleSitemapGeneration = async () => {
    setIsGeneratingSitemap(true);
    const result = await generateSitemapAction();
    if (result.success) {
      toast({ title: 'Sitemap Generated', description: 'sitemap.xml has been successfully created/updated.' });
    } else {
      toast({ title: 'Sitemap Generation Failed', description: result.message, variant: 'destructive' });
    }
    setIsGeneratingSitemap(false);
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <form action={updateSiteSettings} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>
              Manage your sitewide settings. These changes will be reflected across the entire site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* General Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input id="site_name" name="site_name" defaultValue={initialSettings['site_name']} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_logo_url">Header Logo URL</Label>
                  <Input id="site_logo_url" name="site_logo_url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                  <MediaPicker onImageSelect={setLogoUrl} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="site_preloader_logo_url">Preloader Logo URL</Label>
                  <Input id="site_preloader_logo_url" name="site_preloader_logo_url" value={preloaderLogoUrl} onChange={(e) => setPreloaderLogoUrl(e.target.value)} />
                  <MediaPicker onImageSelect={setPreloaderLogoUrl} />
                   <p className="text-sm text-muted-foreground">Optional. If not set, the Header Logo will be used.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_footer_logo_url">Footer Logo URL</Label>
                  <Input id="site_footer_logo_url" name="site_footer_logo_url" value={footerLogoUrl} onChange={(e) => setFooterLogoUrl(e.target.value)} />
                  <MediaPicker onImageSelect={setFooterLogoUrl} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_favicon_url">Favicon URL</Label>
                  <Input id="site_favicon_url" name="site_favicon_url" value={faviconUrl} onChange={(e) => setFaviconUrl(e.target.value)} />
                  <MediaPicker onImageSelect={setFaviconUrl} />
                </div>
              </div>
            </div>

            {/* Homepage Section Visibility */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Homepage Sections</h3>
               <div className="space-y-4 rounded-md border p-4">
                {homepageSections.map(section => (
                  <div key={section} className="flex items-center justify-between">
                    <Label htmlFor={`homepage_section_${section}_enabled`} className="flex flex-col space-y-1 capitalize">
                      <span>Show "{section.replace('_', ' ')}" Section</span>
                    </Label>
                    <Switch
                      id={`homepage_section_${section}_enabled`}
                      name={`homepage_section_${section}_enabled`}
                      defaultChecked={initialSettings[`homepage_section_${section}_enabled`] !== 'false'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="space-y-4 rounded-md border p-4">
                 <div className="space-y-2">
                  <Label htmlFor="contact_address">Address</Label>
                  <Textarea id="contact_address" name="contact_address" defaultValue={initialSettings['contact_address']} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone Number</Label>
                  <Input id="contact_phone" name="contact_phone" defaultValue={initialSettings['contact_phone']} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email Address</Label>
                  <Input id="contact_email" name="contact_email" type="email" defaultValue={initialSettings['contact_email']} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_map_html">Contact Map HTML</Label>
                  <Textarea id="contact_map_html" name="contact_map_html" defaultValue={initialSettings['contact_map_html']} placeholder="Paste your <iframe> embed code here." rows={6} />
                   <p className="text-sm text-muted-foreground">
                    Paste the full iframe code from Google Maps share/embed option.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Media</h3>
              {socialPlatforms.map(platform => (
                <div key={platform} className="space-y-4 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${platform}_enabled`} className="flex flex-col space-y-1 capitalize">
                      <span>{platform}</span>
                    </Label>
                    <Switch
                      id={`${platform}_enabled`}
                      name={`${platform}_enabled`}
                      defaultChecked={initialSettings[`${platform}_enabled`] === 'true'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${platform}_url`}>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</Label>
                    <Input
                      id={`${platform}_url`}
                      name={`${platform}_url`}
                      defaultValue={initialSettings[`${platform}_url`]}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Floating Button */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">WhatsApp Floating Button</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="whatsapp_enabled" className="flex flex-col space-y-1">
                    <span>Enable WhatsApp Button</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      Display a floating WhatsApp button on all pages.
                    </span>
                  </Label>
                  <Switch
                    id="whatsapp_enabled"
                    name="whatsapp_enabled"
                    defaultChecked={initialSettings['whatsapp_enabled'] === 'true'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_recipient_number">WhatsApp Recipient Number</Label>
                  <Input
                    id="whatsapp_recipient_number"
                    name="whatsapp_recipient_number"
                    placeholder="e.g., 1234567890"
                    defaultValue={initialSettings['whatsapp_recipient_number']}
                  />
                   <p className="text-sm text-muted-foreground">
                    Enter the phone number including country code, without any symbols or spaces.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit">Save All Settings</Button>
          </CardContent>
        </Card>
      </form>
       {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
            <CardDescription>Manage your site's SEO, analytics integrations, and sitemap.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
             <form action={updateSiteSettings} className="space-y-4">
              <div className="space-y-4 rounded-md border p-4">
                <Label htmlFor="robots_txt">robots.txt</Label>
                <Textarea id="robots_txt" name="robots_txt" rows={8} defaultValue={initialSettings['robots_txt'] || "User-agent: *\nAllow: /"} />
                <p className="text-sm text-muted-foreground">The content of your robots.txt file. This tells search engine crawlers which pages or files the crawler can or can't request from your site.</p>
              </div>
               <div className="space-y-4 rounded-md border p-4">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input id="google_analytics_id" name="google_analytics_id" placeholder="G-XXXXXXXXXX" defaultValue={initialSettings['google_analytics_id']} />
              </div>
              <div className="space-y-4 rounded-md border p-4">
                <Label htmlFor="google_tag_manager_id">Google Tag Manager ID</Label>
                <Input id="google_tag_manager_id" name="GTM-XXXXXXX" placeholder="GTM-XXXXXXX" defaultValue={initialSettings['google_tag_manager_id']} />
              </div>
              <div className="space-y-4 rounded-md border p-4">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input id="facebook_pixel_id" name="facebook_pixel_id" placeholder="Your Pixel ID" defaultValue={initialSettings['facebook_pixel_id']} />
              </div>
               <Button type="submit">Save SEO Settings</Button>
            </form>
            <div className="space-y-4 rounded-md border p-4">
              <Label>Sitemap</Label>
              <div className="pt-2">
                <Button type="button" onClick={handleSitemapGeneration} disabled={isGeneratingSitemap}>
                  {isGeneratingSitemap && <Loader2 className="mr-2 animate-spin" />}
                  Generate sitemap.xml
                </Button>
                <p className="text-sm text-muted-foreground mt-2">This will generate a new sitemap and place it in your site's public folder.</p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
