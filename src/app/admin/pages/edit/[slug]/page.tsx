
'use client';

import { updatePageContent } from '@/lib/actions';
import { getPageBySlugSA } from '@/lib/data/server-actions';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import type { Page } from '@/lib/types';
import { MediaPicker } from '@/app/admin/media/media-picker';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash } from 'lucide-react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';

// Define the desired order of sections for the homepage
const homePageSectionOrder = ['hero', 'services', 'about', 'testimonials', 'stats', 'blog', 'newsletter', 'contact'];
const aboutPageSectionOrder = ['hero', 'story', 'mission_vision', 'founder', 'team'];

const pageSectionOrders: Record<string, string[]> = {
  home: homePageSectionOrder,
  about: aboutPageSectionOrder,
  // Add other pages here if they have a specific section order
};

export default function EditPageContentPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [page, setPage] = useState<Page | null>(null);
  const [orderedContent, setOrderedContent] = useState<Record<string, any>>({});

  const { register, control, handleSubmit, reset, setValue, watch } = useForm<Page>();

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "content.stats.items" });
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({ control, name: "content.about.features" });

  useEffect(() => {
    if (!slug) return;
    async function fetchPage() {
      const pageData = await getPageBySlugSA(slug);
      if (pageData) {
        setPage(pageData);
        
        // Initialize enabled: true for any section that doesn't have it
        const contentWithDefaults = pageData.content || {};
        Object.keys(contentWithDefaults).forEach(sectionKey => {
          if (typeof contentWithDefaults[sectionKey] === 'object' && contentWithDefaults[sectionKey] !== null && !('enabled' in contentWithDefaults[sectionKey])) {
             contentWithDefaults[sectionKey].enabled = true;
          }
        });
        
        const updatedPageData = {...pageData, content: contentWithDefaults };
        reset(updatedPageData);

        const sectionOrder = pageSectionOrders[slug] || Object.keys(updatedPageData.content || {});

        if (updatedPageData.content) {
            const sortedContent: Record<string, any> = {};
            sectionOrder.forEach(key => {
                if (updatedPageData.content[key]) {
                    sortedContent[key] = updatedPageData.content[key];
                }
            });
            Object.keys(updatedPageData.content).forEach(key => {
                if (!sortedContent[key]) {
                    sortedContent[key] = updatedPageData.content[key];
                }
            });
            setOrderedContent(sortedContent);
        }
      }
    }
    fetchPage();
  }, [slug, reset]);

  const onSubmit = (data: Page) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('slug', slug);
    formData.append('content', JSON.stringify(data.content));
    updatePageContent(formData);
  };
  
  const handleImageSelect = (fieldName: any, url: string) => {
    setValue(fieldName, url);
  };

  const renderField = (key: string, value: any, prefix: string) => {
    const fullKey = `${prefix}.${key}` as const;
    const displayName = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Skip rendering the 'enabled' field as it will have a dedicated switch
    if (key === 'enabled') return null;

    if (key === 'items' && prefix.endsWith('stats')) {
        return (
            <div key={fullKey} className="space-y-4">
                 <h5 className="font-medium">Stats Items</h5>
                 {statFields.map((item, index) => (
                     <div key={item.id} className="flex gap-4 items-end border p-2 rounded-md">
                        <div className="flex-grow space-y-2">
                           <Label>Value</Label>
                           <Controller
                                name={`content.stats.items.${index}.value`}
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                        <div className="flex-grow space-y-2">
                           <Label>Label</Label>
                            <Controller
                                name={`content.stats.items.${index}.label`}
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                         <Button type="button" variant="destructive" onClick={() => removeStat(index)}><Trash /></Button>
                     </div>
                 ))}
                 <Button type="button" variant="outline" onClick={() => appendStat({ value: '', label: '' })}>Add Stat Item</Button>
            </div>
        )
    }

    if (key === 'features' && prefix.endsWith('about')) {
       return (
            <div key={fullKey} className="space-y-4">
                 <h5 className="font-medium">About Features</h5>
                 {featureFields.map((item, index) => (
                     <div key={item.id} className="flex gap-4 items-end border p-2 rounded-md">
                        <div className="flex-grow space-y-2">
                           <Label>Feature Text</Label>
                           <Controller
                                name={`content.about.features.${index}.text`}
                                control={control}
                                render={({ field }) => <Input {...field} />}
                            />
                        </div>
                         <Button type="button" variant="destructive" onClick={() => removeFeature(index)}><Trash /></Button>
                     </div>
                 ))}
                 <Button type="button" variant="outline" onClick={() => appendFeature({ text: '' })}>Add Feature</Button>
            </div>
        )
    }

    if (typeof value === 'string') {
      const isURL = key.includes('image') || key.includes('url');
      const isLongText = value.length > 100 || key.includes('text') || key.includes('paragraph') || key.includes('description');
      
      return (
        <div key={fullKey} className="space-y-2">
          <Label htmlFor={fullKey}>{displayName}</Label>
          <Controller
            name={fullKey as any}
            control={control}
            render={({ field }) => (
                isLongText ? (
                    <Textarea id={fullKey} {...field} />
                ) : (
                    <Input id={fullKey} {...field} />
                )
            )}
          />
          {isURL && <MediaPicker onImageSelect={(url) => handleImageSelect(fullKey, url)} />}
        </div>
      );
    }
    return null;
  };
  
 const renderContentFields = (content: any, prefix = 'content') => {
    return Object.entries(content).map(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const sectionName = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const switchFieldName = `${prefix}.${key}.enabled` as any;
        return (
          <div key={key} className="space-y-4 rounded-md border p-4">
            <div className="flex justify-between items-center pb-4 border-b">
                <h4 className="font-semibold capitalize text-lg">{sectionName} Section</h4>
                <div className="flex items-center gap-2">
                    <Label htmlFor={switchFieldName} className="text-sm">
                        {watch(switchFieldName) ? 'Enabled' : 'Disabled'}
                    </Label>
                    <Controller
                        name={switchFieldName}
                        control={control}
                        render={({ field }) => (
                            <Switch
                                id={switchFieldName}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>
            {watch(switchFieldName) && (
              <div className="pt-4 space-y-4">
                  {renderContentFields(value, `${prefix}.${key}`)}
              </div>
            )}
          </div>
        );
      }
      return renderField(key, value, prefix);
    });
  };

  if (!page) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 rounded-md border p-4"><Skeleton className="h-6 w-1/4" /><Skeleton className="h-10 w-full" /><Skeleton className="h-20 w-full" /></div>
                <div className="space-y-4 rounded-md border p-4"><Skeleton className="h-6 w-1/4" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
                <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Edit Page: {page.title}</CardTitle>
          <CardDescription>Modify the content for this page. Use the toggles to enable or disable entire sections.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-md border p-4">
            <h4 className="font-semibold capitalize">SEO & Metadata</h4>
            <div className="space-y-2">
              <Label htmlFor="title">SEO Title</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">SEO Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea {...field} />}
              />
            </div>
          </div>
          
          {orderedContent && renderContentFields(orderedContent)}

          <Button type="submit">Update Page</Button>
        </CardContent>
      </Card>
    </form>
  );
}
