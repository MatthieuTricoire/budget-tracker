"use server";

import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/user-settings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateCurrency(currency: string) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({ currency });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = prisma.userSetting.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });

  return userSettings;
}