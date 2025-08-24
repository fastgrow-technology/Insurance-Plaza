'use client';
import { deleteTestimonial } from '@/lib/actions';
import { useTransition } from 'react';
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function DeleteTestimonialButton({ testimonialId }: { testimonialId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTestimonial(testimonialId);
    });
  };

  return (
    <DeleteConfirmationDialog
      onDelete={handleDelete}
      itemName={`testimonial #${testimonialId}`}
    >
       <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
          Delete
       </DropdownMenuItem>
    </DeleteConfirmationDialog>
  );
}
