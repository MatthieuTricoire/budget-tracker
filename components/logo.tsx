import { PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <PiggyBankIcon className="stroke size-11 stroke-yellow-200" />
      <span className="bg-gradient-to-r from-yellow-200 to-amber-600 bg-clip-text text-3xl/tight tracking-tighter text-transparent font-bold">
        Budget Tracker
      </span>
    </Link>
  );
};

export const MobileLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="bg-gradient-to-r from-yellow-200 to-amber-600 bg-clip-text text-xl/tight tracking-tighter text-transparent font-bold">
        Budget Tracker
      </span>
    </Link>
  );
};
