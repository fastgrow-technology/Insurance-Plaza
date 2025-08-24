
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
import { DeleteQuoteButton } from './delete-quote-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default async function QuoteSubmissionsPage() {
  const supabase = createSupabaseServerClient();
  const { data: submissions, error } = await supabase.from('quote_submissions').select('id, created_at, service, full_name, email, phone').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quote submissions:', error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Quote Submissions</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Received Quotes</CardTitle>
            <CardDescription>
              Here are the quote requests submitted through your website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Received</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions?.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{format(new Date(submission.created_at), 'PPP p')}</TableCell>
                    <TableCell>{submission.service || 'N/A'}</TableCell>
                    <TableCell className="font-medium">{submission.full_name}</TableCell>
                    <TableCell>{submission.email}</TableCell>
                    <TableCell>{submission.phone || 'N/A'}</TableCell>
                    <TableCell className="flex items-center gap-2">
                       <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/submissions/quotes/${submission.id}`}>
                          <Eye className="size-4" />
                        </Link>
                      </Button>
                      <DeleteQuoteButton submissionId={submission.id} />
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
