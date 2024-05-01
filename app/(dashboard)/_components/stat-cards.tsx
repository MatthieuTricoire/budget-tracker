"use client";

import { UserSetting } from ".prisma/client";
import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { SkeletonWrapper } from "@/components/skeleton-wrapper";
import { Card } from "@/components/ui/card";
import { dateToUTCDate, getFormatterForCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

type StatsCardsProps = {
  userSettings: UserSetting;
  from: Date;
  to: Date;
};
export const StatsCards = ({ userSettings, from, to }: StatsCardsProps) => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${dateToUTCDate(from)}&to=${dateToUTCDate(to)}`,
      ).then((response) => response.json()),
  });

  const formatter = useMemo(() => {
    return getFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;
  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={income}
          title="Income"
          icon={
            <TrendingUp className="size-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={expense}
          title="Expense"
          icon={
            <TrendingDown className="size-12 items-center rounded-lg p-2 text-pink-500 bg-pink-400/10" />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={
            <Wallet className="size-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
};

type StatCardType = {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: string;
  value: number;
};
const StatCard = ({ formatter, icon, title, value }: StatCardType) => {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter],
  );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
};
