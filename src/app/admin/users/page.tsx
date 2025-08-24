
import { createSupabaseServerClient } from '@/lib/supabase/server-actions';
import { MoreHorizontal } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { InviteUserForm } from './invite-user-form';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { DeleteUserButton } from './delete-user-button';
import { ResendInviteButton } from './resend-invite-button';
import { notFound } from 'next/navigation';

export default async function UsersPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user: currentUser } } = await supabase.auth.getUser();

  const { data: users, error } = await supabase.from('users_with_roles_view').select('*');

  if (error) {
    console.error("Error fetching users:", error);
    notFound();
  }
  
  const allUsers = users as any[];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-semibold">Users</h1>
        </div>
        <InviteUserForm />
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage access to your admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map((listUser) => (
                  <TableRow key={listUser.id}>
                    <TableCell className="font-medium">{listUser.email}</TableCell>
                    <TableCell>
                      <Badge variant={listUser.role === 'admin' ? 'default' : 'secondary'}>
                        {listUser.role || 'No Role'}
                      </Badge>
                    </TableCell>
                     <TableCell>
                      <Badge variant={!listUser.last_sign_in_at ? 'outline' : 'default'}>
                        {!listUser.last_sign_in_at ? 'Invited' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {listUser.last_sign_in_at ? format(new Date(listUser.last_sign_in_at), 'PPP p') : 'Never'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {!listUser.last_sign_in_at && listUser.email && <ResendInviteButton email={listUser.email} />}
                          <DeleteUserButton userId={listUser.id} isCurrentUser={listUser.id === currentUser?.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
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

    

    