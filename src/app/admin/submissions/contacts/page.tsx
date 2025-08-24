
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
import { DeleteContactButton } from './delete-contact-button';

export default async function ContactSubmissionsPage() {
  const supabase = createSupabaseServerClient();
  const { data: submissions, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact submissions:', error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Contact Form Submissions</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Received Messages</CardTitle>
            <CardDescription>
              Here are the messages submitted through your website's contact form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Received</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions?.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{format(new Date(submission.created_at), 'PPP p')}</TableCell>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.phone || 'N/A'}</TableCell>
                    <TableCell>{submission.service || 'N/A'}</TableCell>
                    <TableCell className="max-w-xs truncate">{submission.message}</TableCell>
                    <TableCell>
                      <DeleteContactButton submissionId={submission.id} />
                    </TableCell>
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

    

    