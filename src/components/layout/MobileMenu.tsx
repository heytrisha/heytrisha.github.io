'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: NavLink[];
  basePath: string;
}

export function MobileMenu({ links, basePath }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" />
        }
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">Open menu</span>
      </DialogTrigger>
      <DialogContent className="fixed inset-0 top-0 left-0 z-50 h-full max-w-none translate-x-0 translate-y-0 rounded-none bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className="flex h-full flex-col p-6">
          <nav className="mt-8 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`${basePath}/resume.pdf`}
              download
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              Resume
            </a>
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  );
}
