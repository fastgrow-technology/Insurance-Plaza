
import { updateTestimonial } from '@/lib/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { notFound } from 'next/navigation';
import { TestimonialForm } from '../../testimonial-form';

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: testimonial, error } = await supabase.from('testimonials').select('*').eq('id', params.id).single();

  if (error || !testimonial) {
    notFound();
  }

  const updateTestimonialWithId = updateTestimonial.bind(null, testimonial.id);

  return (
    <TestimonialForm
      formAction={updateTestimonialWithId}
      initialData={testimonial}
      title="Edit Testimonial"
      buttonText="Update Testimonial"
    />
  );
}

    

    