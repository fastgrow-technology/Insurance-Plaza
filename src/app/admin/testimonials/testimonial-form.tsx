
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { testimonialFormSchema } from '@/lib/validators';
import type { Testimonial } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaPicker } from '../media/media-picker';

type TestimonialFormData = Omit<Testimonial, 'id'>;

interface TestimonialFormProps {
  formAction: (formData: FormData) => void;
  initialData?: Testimonial | null;
  title: string;
  buttonText: string;
}

export function TestimonialForm({ formAction, initialData, title, buttonText }: TestimonialFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: initialData ? {
        ...initialData,
        quote: initialData.quote || '',
    } : {
      name: '',
      role: '',
      quote: '',
      image: '',
    },
  });

  const imageUrl = watch('image');

  return (
    <form action={handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        formAction(formData);
    })}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Fill out the form to {buttonText.toLowerCase()}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role/Company</Label>
              <Input id="role" {...register('role')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" {...register('image')} />
            <MediaPicker onImageSelect={(url) => setValue('image', url)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea id="quote" {...register('quote')} rows={5} />
          </div>
          <Button type="submit">{buttonText}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
