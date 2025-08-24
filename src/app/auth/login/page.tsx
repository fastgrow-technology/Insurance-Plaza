
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/app/(auth)/login/login-form';
import { Logo } from '@/components/icons/logo';
import { getSiteSettings } from '@/lib/data/server';

export default async function LoginPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const settings = await getSiteSettings();
  
  if (data?.session) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-8 shadow-md">
        <div className="flex justify-center">
            <Logo settings={settings} />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-secondary">
            Sign in to your account
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
