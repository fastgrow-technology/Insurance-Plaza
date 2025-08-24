
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { NotificationSettingsForm } from './notification-settings-form';

export default async function NotificationsPage() {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from('site_settings').select('key, value');

    const settings = data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
    }, {} as Record<string, string>) || {};

    return <NotificationSettingsForm initialSettings={settings} />;
}

    

    