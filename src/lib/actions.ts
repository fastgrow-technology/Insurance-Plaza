
'use server';

import { revalidatePath } from 'next/cache';
import {
  contactFormSchema,
  type ContactFormState,
  serviceFormSchema,
  blogPostFormSchema,
  testimonialFormSchema,
  teamMemberFormSchema,
  pageContentFormSchema,
  quoteFormSchema,
  type QuoteFormState,
  newsletterFormSchema,
} from './validators';
import { routeUserQuery } from '@/ai/flows/route-user-query';
import { redirect } from 'next/navigation';
import type { Service } from './types';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { getSiteSettings } from './data/server';

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Error: Please check the form fields.',
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('contact_submissions').insert([validatedFields.data]);

  if (error) {
    console.error('Error saving contact submission:', error);
    return {
      message: 'Error: Could not save your message. Please try again later.',
    };
  }

  revalidatePath('/admin/submissions/contacts');

  try {
    const result = await routeUserQuery({
      query: validatedFields.data.message,
    });

    return {
      message: 'Success! Your query has been routed.',
      data: {
        department: result.department,
        agent: result.agent,
        reason: result.reason,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

export async function deleteContactSubmission(submissionId: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('contact_submissions').delete().eq('id', submissionId);

  if (error) {
    console.error('Error deleting contact submission:', error);
    return { message: 'Failed to delete submission.' };
  }

  revalidatePath('/admin/submissions/contacts');
}

export async function deleteQuoteSubmission(submissionId: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('quote_submissions').delete().eq('id', submissionId);

  if (error) {
    console.error('Error deleting quote submission:', error);
    return { message: 'Failed to delete submission.' };
  }

  revalidatePath('/admin/submissions/quotes');
}

export async function updateSiteSettings(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const settingsToUpdate = [];
  
  const allKeys = Array.from(formData.keys());
  
  const togglableKeys = [
    'facebook_enabled',
    'twitter_enabled',
    'linkedin_enabled',
    'instagram_enabled',
    'whatsapp_enabled',
    'homepage_section_services_enabled',
    'homepage_section_about_enabled',
    'homepage_section_testimonials_enabled',
    'homepage_section_stats_enabled',
    'homepage_section_blog_enabled',
    'homepage_section_newsletter_enabled',
    'homepage_section_contact_enabled',
  ];

  togglableKeys.forEach(key => {
    // If a toggleable key is not in the form data, it means the switch was off.
    if (!allKeys.includes(key)) {
      formData.append(key, 'false');
    }
  });
  
  for (const [key, value] of formData.entries()) {
    let finalValue = value;
    // The 'on' value comes from checked but valueless switches
    if (value === 'on') {
      finalValue = 'true';
    }
    settingsToUpdate.push({ key, value: finalValue as string });
  }

  // Using a loop to upsert each setting
  for (const setting of settingsToUpdate) {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: setting.key, value: setting.value }, { onConflict: 'key' });

    if (error) {
      console.error(`Error updating setting ${setting.key}:`, error);
      // It might be better to return an error message to the user
      return {
        message: `Error updating setting ${setting.key}.`,
      };
    }
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  revalidatePath('/admin/notifications');
  
  // Redirect back to the page the user was on
  if (formData.has('smtp_host')) {
    redirect('/admin/notifications');
  } else {
    redirect('/admin/settings');
  }
}


export async function createService(formData: Service) {
  const validatedFields = serviceFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid form data' };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('services').insert([validatedFields.data]).select().single();

  if (error) {
    console.error('Error creating service:', error);
    return { message: 'Failed to create service.' };
  }

  revalidatePath('/services');
  revalidatePath(`/services/${data.slug}`);
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

export async function updateService(id: number, formData: Service) {
    const validatedFields = serviceFormSchema.safeParse(formData);
  if (!validatedFields.success) {
    console.error('Validation errors:', validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid form data' };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('services')
    .update(validatedFields.data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    return { message: 'Failed to update service.' };
  }

  revalidatePath('/services');
  revalidatePath(`/services/${data.slug}`);
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

export async function deleteService(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('services').delete().eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    return { message: 'Failed to delete service.' };
  }

  revalidatePath('/services');
  revalidatePath('/admin/services');
  redirect('/admin/services');
}

// Blog Post Actions
export async function createBlogPost(formData: FormData) {
  const validatedFields = blogPostFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { message: 'Invalid data' };
  }
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.from('blog_posts').insert(validatedFields.data).select().single();

  if (error) {
    console.error(error);
    return { message: 'Failed to create blog post' };
  }
  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: number, formData: FormData) {
  const validatedFields = blogPostFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .update(validatedFields.data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return { message: 'Failed to update blog post' };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);

  if (error) {
    return { message: 'Failed to delete blog post' };
  }

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

// Testimonial Actions
export async function createTestimonial(formData: FormData) {
  const validatedFields = testimonialFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid data' };
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('testimonials').insert(validatedFields.data);

  if (error) {
    console.error(error);
    return { message: 'Failed to create testimonial' };
  }
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

export async function updateTestimonial(id: number, formData: FormData) {
  const validatedFields = testimonialFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid data' };
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('testimonials').update(validatedFields.data).eq('id', id);

  if (error) {
    console.error(error);
    return { message: 'Failed to update testimonial' };
  }
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) {
    return { message: 'Failed to delete testimonial' };
  }
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
}

// Team Member Actions
export async function createTeamMember(formData: FormData) {
  const validatedFields = teamMemberFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { message: 'Invalid data' };
  }
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('team_members').insert(validatedFields.data);

  if (error) {
    console.error('Error creating team member:', error);
    return { message: 'Failed to create team member' };
  }

  revalidatePath('/about');
  revalidatePath('/admin/teams');
  redirect('/admin/teams');
}

export async function updateTeamMember(id: number, formData: FormData) {
  const validatedFields = teamMemberFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { message: 'Invalid data' };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('team_members')
    .update(validatedFields.data)
    .eq('id', id);

  if (error) {
    console.error('Error updating team member:', error);
    return { message: 'Failed to update team member' };
  }

  revalidatePath('/about');
  revalidatePath('/admin/teams');
  redirect('/admin/teams');
}

export async function deleteTeamMember(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('team_members').delete().eq('id', id);

  if (error) {
    console.error('Error deleting team member:', error);
    return { message: 'Failed to delete team member' };
  }

  revalidatePath('/about');
  revalidatePath('/admin/teams');
}


// Page Content Actions
export async function updatePageContent(formData: FormData) {
  const supabase = createSupabaseServerClient();
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  
  const contentObject = JSON.parse(formData.get('content') as string);
  
  // Handle the 'enabled' fields for sections, which come from switches
  // and might not be booleans yet
  if (contentObject) {
      for (const sectionKey in contentObject) {
          if (Object.prototype.hasOwnProperty.call(contentObject[sectionKey], 'enabled')) {
              // The form sends 'on'/'off' or true/false, so we need to normalize to boolean
              contentObject[sectionKey].enabled = contentObject[sectionKey].enabled === 'on' || contentObject[sectionKey].enabled === true;
          }
      }
  }

  if (!slug) {
    return { message: 'Slug is missing.' };
  }
  
  const { error } = await supabase
      .from('pages')
      .update({ title, description, content: contentObject })
      .eq('slug', slug);

  if (error) {
      console.error('Error updating page content:', error);
      return { message: `Failed to update page content: ${error.message}` };
  }

  revalidatePath(`/${slug === 'home' ? '' : slug}`);
  revalidatePath('/admin/pages');
  revalidatePath(`/admin/pages/edit/${slug}`);
  redirect('/admin/pages');
}


export async function submitQuote(
  data: z.infer<typeof quoteFormSchema>
): Promise<QuoteFormState> {
  const validatedFields = quoteFormSchema.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'There was an issue with your submission.',
      issues: validatedFields.error.issues,
    };
  }
  
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('quote_submissions').insert([validatedFields.data]);

  if (error) {
    console.error('Error saving quote submission:', error);
    return {
      success: false,
      message: `Could not save your quote request: ${error.message}`,
    };
  }

  revalidatePath('/admin/submissions/quotes');
  return { success: true, message: 'Quote submitted successfully' };
}

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const validatedFields = newsletterFormSchema.safeParse({ email: formData.get('email') });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || 'Invalid email address.',
    };
  }
  
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: validatedFields.data.email });

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      return { success: false, message: 'This email is already subscribed.' };
    }
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
  
  revalidatePath('/admin/submissions/newsletter');
  return { success: true, message: "Thanks for subscribing! You're on the list." };
}
