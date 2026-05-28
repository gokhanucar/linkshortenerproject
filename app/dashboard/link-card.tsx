'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';

type Link = {
  id: number;
  url: string;
  shortCode: string;
  createdAt: Date;
};

type Props = {
  link: Link;
};

export function LinkCard({ link }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Card key={link.id}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-mono">/{link.shortCode}</CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit link"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Delete link"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Created {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <EditLinkDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        link={{ id: link.id, url: link.url, shortCode: link.shortCode }}
      />
      <DeleteLinkDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        link={{ id: link.id, shortCode: link.shortCode }}
      />
    </>
  );
}
