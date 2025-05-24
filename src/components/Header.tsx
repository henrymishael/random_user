"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/" },
  { name: "About", href: "/" },
  {
    name: "Contact",
    href: "/",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className='sticky top-0 z-20 w-full border-b bg-transparent backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
                <Menu className='h-6 w-6' />
                <VisuallyHidden>Toggle menu</VisuallyHidden>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[240px] sm:w-[300px]'>
              <div className='flex flex-col gap-6 py-4'>
                <Link
                  href='/'
                  className='flex items-center gap-2 font-bold text-xl'
                  onClick={() => setIsOpen(false)}
                >
                  MH
                </Link>
                <nav className='flex flex-col gap-4'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link
            href='/'
            className='flex items-center gap-2 font-bold text-xl relative rounded-full h-4 w-4 bg-gray-200 justify-center '
          >
            {/* Logo transition */}
            MH
          </Link>
        </div>
        <nav className='hidden md:flex items-center gap-6'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                pathname === item.href && "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <Button>Enroll Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
