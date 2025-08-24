
'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceFormSchema } from '@/lib/validators';
import type { Service } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaPicker } from '../media/media-picker';
import { ArrowDown, ArrowUp, Trash } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ServiceFormProps {
  formAction: (data: Service) => void;
  initialData?: Service | null;
  title: string;
  buttonText: string;
}

export function ServiceForm({ formAction, initialData, title, buttonText }: ServiceFormProps) {
  const [allServices, setAllServices] = useState<{label: string, value: string}[]>([]);

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<Service>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: initialData || {
      slug: '',
      title: '',
      image: '',
      icon_svg: '',
      short_description: '',
      long_description: '',
      content_sections: [],
      show_benefits: false,
      benefits: [],
      show_target_audience: false,
      target_audience: '',
      show_plans: false,
      plans: [],
      show_steps: false,
      steps: [],
      show_faqs: false,
      faqs: [],
      show_related_services: false,
      related_services: [],
    },
  });

  const { fields: contentSectionFields, append: appendContentSection, remove: removeContentSection, swap: swapContentSection } = useFieldArray({ control, name: "content_sections" });
  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
  const { fields: planFields, append: appendPlan, remove: removePlan } = useFieldArray({ control, name: "plans" });
  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({ control, name: "steps" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: "faqs" });

  const watchShowBenefits = watch('show_benefits');
  const watchShowTargetAudience = watch('show_target_audience');
  const watchShowPlans = watch('show_plans');
  const watchShowSteps = watch('show_steps');
  const watchShowFaqs = watch('show_faqs');
  const watchShowRelated = watch('show_related_services');
  const watchRelatedServices = watch('related_services');

  useEffect(() => {
    async function fetchServices() {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase.from('services').select('slug, title');
        if(data) {
            setAllServices(data.map(s => ({ label: s.title, value: s.slug })));
        }
    }
    fetchServices();
  }, []);

  return (
    <form onSubmit={handleSubmit(formAction)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Fill out the form to {buttonText.toLowerCase()}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register('slug')} />
             {errors.slug && <p className="text-destructive">{errors.slug.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Header Image</Label>
            <MediaPicker onImageSelect={(url) => setValue('image', url)} />
            <Input {...register('image')} placeholder="Image URL will be populated here" />
             {errors.image && <p className="text-destructive">{errors.image.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon_svg">Icon SVG</Label>
            <Textarea id="icon_svg" {...register('icon_svg')} rows={5} placeholder="Paste your SVG code here" />
            <p className="text-sm text-muted-foreground">If provided, this will override the default icon on the service card.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea id="short_description" {...register('short_description')} />
             {errors.short_description && <p className="text-destructive">{errors.short_description.message}</p>}
          </div>

           {/* Content Sections */}
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium text-lg">Content Sections</h3>
              <p className="text-sm text-muted-foreground">Build the main content of your page with reorderable sections.</p>
              {contentSectionFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 border bg-muted/50 p-4 rounded-md">
                  <div className="flex-grow space-y-4">
                    <div className="space-y-2">
                      <Label>Section Type</Label>
                      <Controller
                          name={`content_sections.${index}.type`}
                          control={control}
                          render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger><SelectValue placeholder="Select section type" /></SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="text-image">Text Left, Image Right</SelectItem>
                                      <SelectItem value="image-text">Image Left, Text Right</SelectItem>
                                      <SelectItem value="text-only">Text Only</SelectItem>
                                  </SelectContent>
                              </Select>
                          )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input {...register(`content_sections.${index}.title` as const)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Text</Label>
                      <Textarea {...register(`content_sections.${index}.text` as const)} rows={6} />
                    </div>
                     {watch(`content_sections.${index}.type`) !== 'text-only' && (
                        <div className="space-y-2">
                            <Label>Section Image</Label>
                            <Controller
                                name={`content_sections.${index}.image`}
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <MediaPicker onImageSelect={(url) => field.onChange(url)} />
                                        <Input {...field} value={field.value || ''} placeholder="Image URL will be populated here" />
                                    </>
                                )}
                            />
                        </div>
                     )}
                  </div>
                  <div className="flex flex-col gap-2">
                      <Button type="button" size="icon" variant="outline" onClick={() => swapContentSection(index, index - 1)} disabled={index === 0}>
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" size="icon" variant="outline" onClick={() => swapContentSection(index, index + 1)} disabled={index === contentSectionFields.length - 1}>
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button type="button" size="icon" variant="destructive" onClick={() => removeContentSection(index)}>
                        <Trash className="size-4" />
                      </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendContentSection({ type: 'text-image', title: '', text: '', image: '' })}>Add Content Section</Button>
            </div>


          {/* Dynamic Sections Toggles */}
           <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Controller name="show_benefits" control={control} render={({ field }) => <Switch id="show_benefits" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_benefits">Show Benefits</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller name="show_target_audience" control={control} render={({ field }) => <Switch id="show_target_audience" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_target_audience">Show Target Audience</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller name="show_plans" control={control} render={({ field }) => <Switch id="show_plans" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_plans">Show Plans</Label>
              </div>
               <div className="flex items-center space-x-2">
                <Controller name="show_steps" control={control} render={({ field }) => <Switch id="show_steps" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_steps">Show Steps</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Controller name="show_faqs" control={control} render={({ field }) => <Switch id="show_faqs" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_faqs">Show FAQs</Label>
              </div>
               <div className="flex items-center space-x-2">
                <Controller name="show_related_services" control={control} render={({ field }) => <Switch id="show_related_services" checked={field.value} onCheckedChange={field.onChange} />} />
                <Label htmlFor="show_related_services">Show Related Services</Label>
              </div>
           </div>


          {watchShowBenefits && (
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Benefits Section</h3>
              {benefitFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-grow space-y-2">
                    <Label>Benefit Title</Label>
                    <Input {...register(`benefits.${index}.title` as const)} />
                  </div>
                  <div className="flex-grow space-y-2">
                    <Label>Benefit Description</Label>
                    <Input {...register(`benefits.${index}.description` as const)} />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeBenefit(index)}><Trash /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendBenefit({ title: '', description: '' })}>Add Benefit</Button>
            </div>
          )}

           {watchShowTargetAudience && (
             <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Target Audience</h3>
                 <div className="space-y-2">
                    <Label htmlFor="target_audience">Who is this service for?</Label>
                    <Textarea id="target_audience" {...register('target_audience')} />
                </div>
            </div>
           )}

            {watchShowPlans && (
                 <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-medium">Plans Section</h3>
                    {planFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-4 border rounded-md p-4">
                            <div className="flex gap-4 items-end">
                                <div className="flex-grow space-y-2">
                                    <Label>Plan Name</Label>
                                    <Input {...register(`plans.${index}.name` as const)} />
                                </div>
                                <div className="flex-grow space-y-2">
                                    <Label>Price</Label>
                                    <Input {...register(`plans.${index}.price` as const)} placeholder="e.g., $49/month or Contact Us" />
                                </div>
                                <Button type="button" variant="destructive" onClick={() => removePlan(index)}><Trash /></Button>
                            </div>
                             <div className="space-y-2">
                                 <Label>Features (one per line)</Label>
                                 <Controller
                                    control={control}
                                    name={`plans.${index}.features`}
                                    render={({ field }) => (
                                         <Textarea 
                                            value={Array.isArray(field.value) ? field.value.join('\n') : ''}
                                            onChange={e => field.onChange(e.target.value.split('\n'))}
                                            rows={4}
                                        />
                                    )}
                                 />
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendPlan({ name: '', price: '', features: [] })}>Add Plan</Button>
                </div>
            )}
            
            {watchShowSteps && (
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-medium">"How it Works" Steps</h3>
                    {stepFields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-end">
                            <div className="flex-grow space-y-2">
                                <Label>Step Title</Label>
                                <Input {...register(`steps.${index}.title` as const)} />
                            </div>
                            <div className="flex-grow space-y-2">
                                <Label>Step Description</Label>
                                <Input {...register(`steps.${index}.description` as const)} />
                            </div>
                            <Button type="button" variant="destructive" onClick={() => removeStep(index)}><Trash /></Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendStep({ title: '', description: '' })}>Add Step</Button>
                </div>
            )}

          {watchShowFaqs && (
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">FAQs Section</h3>
              {faqFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-grow space-y-2">
                    <Label>Question</Label>
                    <Input {...register(`faqs.${index}.question` as const)} />
                  </div>
                  <div className="flex-grow space-y-2">
                    <Label>Answer</Label>
                    <Textarea {...register(`faqs.${index}.answer` as const)} />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeFaq(index)}><Trash /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendFaq({ question: '', answer: '' })}>Add FAQ</Button>
            </div>
          )}

          {watchShowRelated && (
             <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Related Services</h3>
                 <div className="space-y-2">
                    <Label>Select related services</Label>
                    <Controller
                        name="related_services"
                        control={control}
                        render={({ field }) => (
                             <Select onValueChange={(value) => field.onChange([...(field.value || []), value])}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Add a related service..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {allServices
                                        .filter(s => !(field.value || []).includes(s.value) && s.value !== initialData?.slug)
                                        .map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        )}
                    />
                     <div className="flex flex-wrap gap-2 pt-2">
                        {watchRelatedServices?.map(slug => {
                            const service = allServices.find(s => s.value === slug);
                            return (
                                <div key={slug} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                                    <span>{service?.label || slug}</span>
                                     <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setValue('related_services', watchRelatedServices?.filter(s => s !== slug) || [])}>
                                        <Trash className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            )
                        })}
                     </div>
                 </div>
            </div>
          )}


          <Button type="submit">{buttonText}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
