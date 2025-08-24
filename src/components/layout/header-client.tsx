
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { SiteSettings } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

interface NavLink {
    href: string;
    label: string;
    dropdown?: { href: string; label: string; }[];
}

interface HeaderClientProps {
  navLinks: NavLink[];
  settings: SiteSettings;
}

export const HeaderClient = ({ navLinks, settings }: HeaderClientProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const NavLink = ({ href, label, className, children, onClick, hasDropdown }: { href: string; label: string; className?: string, children?: React.ReactNode, onClick?: () => void, hasDropdown?: boolean }) => {
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    const linkClasses = cn(
      'font-medium transition-colors hover:text-primary',
      isActive ? 'text-primary' : 'text-gray-800',
      className
    );

    if (hasDropdown) {
        return (
            <div className={cn(linkClasses, 'flex items-center')}>
                {label}
                {children}
            </div>
        )
    }

    return (
      <Link
        href={href}
        className={linkClasses}
        onClick={onClick}
      >
        {label}
        {children}
      </Link>
    );
  };

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full bg-white transition-all duration-300",
        isScrolled ? 'shadow-lg' : 'shadow-md',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo settings={settings} />
        <div className="flex-grow flex justify-end">
            <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
                link.dropdown ? (
                <div key={link.href} className="relative group">
                    <NavLink href={link.href} label={link.label} hasDropdown>
                    <ChevronDown className="ml-1 size-4 transition-transform group-hover:rotate-180" />
                    </NavLink>
                    <div className="absolute top-full right-0 z-20 w-max hidden group-hover:block bg-white shadow-lg rounded-lg py-3 px-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <Link href="/services" className="col-span-2 text-gray-700 font-bold hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors block">All Services</Link>
                        {link.dropdown.map(item => (
                        <Link key={item.href} href={item.href} className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors block whitespace-nowrap">{item.label}</Link>
                        ))}
                    </div>
                    </div>
                </div>
                ) : (
                <NavLink key={link.href} {...link} />
                )
            ))}
            </nav>
        </div>

        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6 text-secondary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0">
               <SheetHeader className="p-4 border-b">
                 <div onClick={() => setSheetOpen(false)}>
                    <Logo settings={settings} />
                 </div>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <ScrollArea className="flex-grow">
                <div className="flex flex-col gap-8 p-4 flex-grow">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                       link.dropdown ? (
                        <Collapsible key={link.href}>
                          <CollapsibleTrigger className='flex justify-between items-center w-full font-medium text-gray-800 hover:text-primary py-2 transition-colors'>
                            {link.label}
                             <ChevronDown className="ml-1 size-4 transition-transform" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4">
                             <div className="flex flex-col gap-2 mt-2">
                               <Link href="/services" onClick={() => setSheetOpen(false)} className="text-gray-700 font-bold hover:text-primary py-1 transition-colors block">All Services</Link>
                               {link.dropdown.map(item => (
                                 <Link key={item.href} href={item.href} onClick={() => setSheetOpen(false)} className="text-gray-700 hover:text-primary py-1 transition-colors block">{item.label}</Link>
                              ))}
                             </div>
                          </CollapsibleContent>
                        </Collapsible>
                       ) : (
                         <NavLink key={link.href} {...link} className="py-2" onClick={() => setSheetOpen(false)} />
                       )
                    ))}
                  </nav>
                </div>
              </ScrollArea>
              <div className="mt-auto p-4 border-t">
                  <Button asChild onClick={() => setSheetOpen(false)} className="w-full">
                  <Link href="/get-a-quote">Get a Quote</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
