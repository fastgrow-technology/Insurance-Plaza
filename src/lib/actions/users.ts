
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server-actions';


const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'editor']),
});

export async function inviteUser(prevState: any, formData: FormData) {
  const validatedFields = inviteSchema.safeParse({
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return { message: 'Error: Invalid email or role.' };
  }

  const { email, role } = validatedFields.data;
  const supabase = createSupabaseServerClient();

  // Invite the user using Supabase Auth
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { role },
  });
  
  if (error) {
    console.error('Error inviting user:', error);
    return { message: `Error: ${error.message}` };
  }
  
  if (data.user) {
     // Set the user's role in the custom user_roles table
    const { error: roleError } = await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role,
    });
     if (roleError) {
      console.error('Error setting user role:', roleError);
      // If setting role fails, we should probably delete the invited user to avoid inconsistency
      await supabase.auth.admin.deleteUser(data.user.id);
      return { message: `Error: User invited but failed to set role. ${roleError.message}` };
    }
  }


  revalidatePath('/admin/users');
  return { message: `Invitation sent to ${email}.` };
}

export async function deleteUser(userId: string) {
    const supabase = createSupabaseServerClient();
    
    // First, delete from the user_roles table
    const { error: roleError } = await supabase.from('user_roles').delete().eq('user_id', userId);

    if (roleError) {
        console.error("Error deleting user role:", roleError);
        // We might want to stop here or just log the error and proceed
        return { success: false, message: `Failed to delete user role: ${roleError.message}` };
    }

    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
        console.error("Error deleting user from auth:", authError);
        return { success: false, message: authError.message };
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User deleted successfully.' };
}

export async function resendInvite(email: string) {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

     if (error) {
        console.error("Error resending invite:", error);
        return { success: false, message: error.message };
    }

    return { success: true, message: `Invite resent to ${email}` };
}

    

    