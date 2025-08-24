
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { format } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function NewsletterSubscribersPage() {
  const supabase = createSupabaseServerClient();
  const { data: subscribers, error } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Newsletter Subscribers</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Your Subscribers</CardTitle>
            <CardDescription>
              Here are the users who have subscribed to your newsletter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscribed On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers?.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{format(new Date(subscriber.created_at), 'PPP p')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    

    