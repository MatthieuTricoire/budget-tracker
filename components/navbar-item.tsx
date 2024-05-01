"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export const NavbarItem = ({
  label,
  link,
  toggleMobileNavbar,
}: {
  label: string;
  link: string;
  toggleMobileNavbar?: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          {
            "text-foreground": isActive,
          },
        )}
        href={link}
        onClick={() => {
          if (toggleMobileNavbar) toggleMobileNavbar();
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] rounded-xl bg-foreground md:block w-[80%] -translate-x-1/2"></div>
      )}
    </div>
  );
};
