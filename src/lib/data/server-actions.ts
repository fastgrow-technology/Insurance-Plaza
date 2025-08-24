
'use server';

import type { Page, Media } from '../types';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server-actions';


export async function getPagesSA(): Promise<Page[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('pages').select('*');
  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
  return data;
}

export async function getPageBySlugSA(slug: string): Promise<Page | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).single();
  if (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
  return data;
}

export async function getMediaFiles(): Promise<Media[]> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching media files:', error);
        return [];
    }
    
     const filesWithUrls = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(file.name);
        return {
            ...file,
            url: publicUrl,
        };
    });

    return filesWithUrls;
}

    

    