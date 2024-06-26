import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { CreateTransactionDialog } from "./_components/create-transaction-dialog";
import { Overview } from "./_components/overview";
import { History } from "./_components/history";

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSetting.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!userSettings) {
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName} !</p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              type="income"
              trigger={
                <Button className="border border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white">
                  New income 💸
                </Button>
              }
            />
            <CreateTransactionDialog
              type="expense"
              trigger={
                <Button className="border border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white">
                  New expense 🫢
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings} />

      <History userSetting={userSettings} />
    </div>
  );
};

export default DashboardPage;
