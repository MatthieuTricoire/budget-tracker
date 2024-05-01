import React, { ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
type SkeletonWrapperProps = {
  children: ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
};
export const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth = true,
}: SkeletonWrapperProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <Skeleton className={cn({ "w-full": fullWidth })}>
      <div className="opacity-0">{children}</div>
    </Skeleton>
  );
};
