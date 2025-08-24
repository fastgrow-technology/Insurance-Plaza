
import { updateTeamMember } from '@/lib/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { notFound } from 'next/navigation';
import { TeamForm } from '../../team-form';

export default async function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: member, error } = await supabase.from('team_members').select('*').eq('id', params.id).single();

  if (error || !member) {
    notFound();
  }

  const updateMemberWithId = updateTeamMember.bind(null, member.id);

  return (
    <TeamForm
      formAction={updateMemberWithId}
      initialData={member}
      title="Edit Team Member"
      buttonText="Update Member"
    />
  );
}

    

    