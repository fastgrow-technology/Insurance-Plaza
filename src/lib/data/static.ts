import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import type { Service, BlogPost, Page } from '../types';

// This file uses a build-safe supabase client for static data fetching.
// It should only be used in functions that are called during build time (e.g., generateStaticParams).

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is not defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getServices(): Promise<Pick<Service, 'slug' | 'title' | 'image' | 'short_description' | 'icon_svg'>[]> {
    const { data, error } = await supabase.from('services').select('slug, title, image, short_description, icon_svg');
    if (error) {
        console.error('Error fetching services for static generation:', error);
        return [];
    }
    return data;
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
    let query = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }
    
    const { data, error } = await query;

    if (error) {
        console.error('Error fetching blog posts for static generation:', error);
        return [];
    }
    return data.map(post => ({
        ...post,
        date: format(new Date(post.published_at), 'MMMM d, yyyy'),
    }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
    if (error) {
        console.error(`Error fetching blog post with slug ${slug} for static generation:`, error);
        return null;
    }
    return {
        ...data,
        date: format(new Date(data.published_at), 'MMMM d, yyyy'),
    };
}


export async function getPages(): Promise<Page[]> {
  const { data, error } = await supabase.from('pages').select('*');
  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
  return data;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase.from('pages').select('*').eq('slug', slug).single();
  if (error) {
    // Gracefully handle not found error for slugs that don't exist
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
  return data;
}
