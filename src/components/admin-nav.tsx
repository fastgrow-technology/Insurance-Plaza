
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  Tv,
  Newspaper,
  MessageSquareQuote,
  Cog,
  Mail,
  Bell,
  Library,
  Users,
  FilePlus,
  Send,
  Database,
  ChevronDown
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const adminNavLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { href: '/admin/pages', label: 'Page Content', icon: FileText },
  { href: '/admin/services', label: 'Services', icon: Tv },
  { href: '/admin/blog', label: 'Blog Posts', icon: Newspaper },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/teams', label: 'Team', icon: Users },
  { href: '/admin/users', label: 'Users', icon: Users },
  {
    label: 'Submissions',
    icon: Database,
    subLinks: [
      { href: '/admin/submissions/contacts', label: 'Contacts', icon: Mail },
      { href: '/admin/submissions/quotes', label: 'Quote Requests', icon: FilePlus },
      { href: '/admin/submissions/newsletter', label: 'Newsletter', icon: Send },
    ]
  },
  { href: '/admin/media', label: 'Media Library', icon: Library },
  {
    href: '/admin/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  { href: '/admin/settings', label: 'Site Settings', icon: Cog },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {adminNavLinks.map((link) => {
        if (link.subLinks) {
          const isSubActive = link.subLinks.some(sub => pathname.startsWith(sub.href));
          return (
            <Collapsible key={link.label} defaultOpen={isSubActive}>
              <CollapsibleTrigger className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180',
                   isSubActive && 'text-primary'
              )}>
                <div className="flex items-center gap-3">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsibleContent className="py-1 pl-10">
                <div className="grid gap-1">
                {link.subLinks.map(subLink => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      pathname.startsWith(subLink.href) && 'bg-muted text-primary'
                    )}
                  >
                    {subLink.label}
                  </Link>
                ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        }

        const isActive = link.href === '/admin' ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              isActive && 'bg-muted text-primary'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
