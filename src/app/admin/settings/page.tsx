
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { SettingsForm } from './settings-form';

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('site_settings').select('key, value');

  const settings = data?.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>) || {};

  return <SettingsForm initialSettings={settings} />;
}

    

    