import { Category } from "@prisma/client";
import React from "react";

type CategoryRowProps = {
  category: Category;
};
export const CategoryRow = ({ category }: CategoryRowProps) => {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
};
