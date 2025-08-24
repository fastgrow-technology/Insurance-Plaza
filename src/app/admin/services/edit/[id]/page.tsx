
import { updateService } from '@/lib/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { notFound } from 'next/navigation';
import { ServiceForm } from '../../service-form';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: service, error } = await supabase.from('services').select('*').eq('id', params.id).single();

  if (error || !service) {
    notFound();
  }

  const updateServiceWithId = updateService.bind(null, service.id);

  return (
    <ServiceForm
      formAction={updateServiceWithId}
      initialData={service}
      title="Edit Service"
      buttonText="Update Service"
    />
  );
}

    

    