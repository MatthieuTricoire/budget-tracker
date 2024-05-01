"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { NavbarItem } from "./navbar-item";
import { navLinks } from "@/data/navbar";
import { Logo, MobileLogo } from "./logo";
import { ThemeSwitcherBtn } from "./theme-switcher-btn";
import { UserButton } from "@clerk/nextjs";

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((item) => (
                <NavbarItem
                  label={item.label}
                  link={item.link}
                  key={item.label}
                  toggleMobileNavbar={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div
          className="flex h-[80px] min-h-[60px]
          items-center gap-x-4"
        >
          <MobileLogo />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};
