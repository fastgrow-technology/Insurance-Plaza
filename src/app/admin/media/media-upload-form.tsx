
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useActionState } from 'react';

import { uploadMediaFile } from '@/lib/actions/media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" />
          Uploading...
        </>
      ) : (
        <>
          <Upload className="mr-2" />
          Upload File
        </>
      )}
    </Button>
  );
}

interface MediaUploadFormProps {
    onUploadSuccess?: () => void;
}

export function MediaUploadForm({ onUploadSuccess }: MediaUploadFormProps) {
  const [state, formAction] = useActionState(uploadMediaFile, { success: false, message: '' });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        formRef.current?.reset();
        if (onUploadSuccess) {
            onUploadSuccess();
        }
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onUploadSuccess]);
  
  return (
    <form ref={formRef} action={formAction} className="flex gap-4">
      <Input type="file" name="file" required className="max-w-xs" />
      <SubmitButton />
    </form>
  );
}
