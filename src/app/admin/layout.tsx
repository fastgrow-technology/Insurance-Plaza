

import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { redirect } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import AdminDashboardLayout from '@/app/(admin)/layout';

export default async function AdminAreaLayout({ children }: PropsWithChildren) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <AdminDashboardLayout>
        {children}
    </AdminDashboardLayout>
  );
}
