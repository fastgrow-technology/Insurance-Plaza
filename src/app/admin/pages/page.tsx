
import Link from 'next/link';
import { getPages } from '@/lib/data/server';

import { Button } from '@/components/ui/button';
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

export default async function PagesAdminPage() {
  const pages = await getPages();
  // Filter out the quote page as it doesn't have editable content in this system
  const pagesToShow = pages?.filter(p => p.slug !== 'get-a-quote');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Page Content</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Manage Page Content</CardTitle>
            <CardDescription>
              Edit the content of your website's main pages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagesToShow?.map((page) => (
                  <TableRow key={page.slug}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-right">
                       <Button asChild>
                          <Link href={`/admin/pages/edit/${page.slug}`}>Edit</Link>
                       </Button>
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


