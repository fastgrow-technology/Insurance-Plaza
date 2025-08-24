
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { Cog, Newspaper, MessageSquareQuote, Tv, FileText, Mail, Bell, Library, Users, Activity, FilePlus, Send, Database } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {

  const supabase = createSupabaseServerClient();
  
  const { count: servicesCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
  const { count: postsCount } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true });
  const { count: testimonialsCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });
  const { count: contactsCount } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true });
  
  const stats = [
    { title: "Total Services", value: servicesCount, icon: <Tv className="size-5 text-muted-foreground" />, href: '/admin/services' },
    { title: "Total Blog Posts", value: postsCount, icon: <Newspaper className="size-5 text-muted-foreground" />, href: '/admin/blog' },
    { title: "Total Testimonials", value: testimonialsCount, icon: <MessageSquareQuote className="size-5 text-muted-foreground" />, href: '/admin/testimonials' },
    { title: "Contact Submissions", value: contactsCount, icon: <Mail className="size-5 text-muted-foreground" />, href: '/admin/submissions/contacts' },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Here's a quick overview of your website's content and activity.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

    

    