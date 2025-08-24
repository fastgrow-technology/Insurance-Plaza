
import { updateBlogPost } from '@/lib/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { notFound } from 'next/navigation';
import { BlogPostForm } from '../../blog-post-form';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: post, error } = await supabase.from('blog_posts').select('*').eq('id', params.id).single();

  if (error || !post) {
    notFound();
  }

  const updatePostWithId = updateBlogPost.bind(null, post.id);

  return (
    <BlogPostForm
      formAction={updatePostWithId}
      initialData={post}
      title="Edit Blog Post"
      buttonText="Update Post"
    />
  );
}

    

    