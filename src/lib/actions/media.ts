
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server-actions';

export async function uploadMediaFile(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient();
  const file = formData.get('file') as File;
  
  if (!file) {
    return { success: false, message: 'No file provided.' };
  }

  // Client-side validation could also be added for a better user experience
  if (file.size > 1 * 1024 * 1024) { // 1MB
      return { success: false, message: 'File exceeds the 1MB limit.' };
  }

  const { data: uploadData, error: uploadError } = await supabase.storage.from('media').upload(file.name, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    if (uploadError.message.includes('413')) { // 413 Payload Too Large
        return { success: false, message: 'File exceeds the 1MB limit.' };
    }
    return { success: false, message: `Failed to upload file: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage.from('media').getPublicUrl(uploadData.path);

  const { error: dbError } = await supabase.from('media').insert({
    name: file.name,
    url: urlData.publicUrl,
    alt_text: '',
  });

  if (dbError) {
    console.error('Error saving media to database:', dbError);
    // Optionally delete from storage if DB insert fails
    await supabase.storage.from('media').remove([file.name]);
    return { success: false, message: 'File uploaded but failed to save to database.' };
  }
  
  revalidatePath('/admin/media');
  return { success: true, message: 'File uploaded successfully.' };
}

export async function getMediaFileByName(fileName: string) {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('media').select('*').eq('name', fileName).single();
    if (error) {
        console.error('Error fetching media file:', error);
        return null;
    }
    return data;
}

export async function updateMediaAltText(fileName: string, altText: string) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from('media').update({ alt_text: altText }).eq('name', fileName);
    if (error) {
        console.error('Error updating alt text:', error);
        return { success: false, message: 'Failed to update alt text.' };
    }
    revalidatePath('/admin/media');
    revalidatePath(`/admin/media/edit/${fileName}`);
    return { success: true };
}


export async function deleteMediaFile(fileName: string) {
  const supabase = createSupabaseServerClient();
  const { error: dbError } = await supabase.from('media').delete().eq('name', fileName);
  if (dbError) {
    console.error('Error deleting from db:', dbError);
    return { success: false, message: 'Failed to delete file from database.' };
  }
  const { error: storageError } = await supabase.storage.from('media').remove([fileName]);
  if (storageError) {
    console.error('Error deleting file from storage:', storageError);
    return { success: false, message: 'Failed to delete file from storage.' };
  }

  revalidatePath('/admin/media');
  return { success: true, message: 'File deleted successfully.' };
}

    

    