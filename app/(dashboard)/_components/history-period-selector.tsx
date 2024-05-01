import { HistoryPeriodsResponseType } from "@/app/api/history-periods/route";
import { SkeletonWrapper } from "@/components/skeleton-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, Timeframe } from "@/lib/types";
import { Query, useQuery } from "@tanstack/react-query";

type HistoryPeriodSelectorProps = {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (Timeframe: Timeframe) => void;
};
export const HistoryPeriodSelector = ({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}: HistoryPeriodSelectorProps) => {
  const historyPeriods = useQuery<HistoryPeriodsResponseType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: () => fetch("/api/history-periods").then((res) => res.json()),
  });
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
        <Tabs
          value={timeframe}
          onValueChange={(value) => {
            setTimeframe(value as Timeframe);
          }}
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>

      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper
          fullWidth={false}
          isLoading={historyPeriods.isFetching}
        >
          <YearSelector
            period={period}
            setPeriod={setPeriod}
            years={historyPeriods.data || []}
          />
        </SkeletonWrapper>

        {timeframe === "month" && (
          <SkeletonWrapper
            isLoading={historyPeriods.isFetching}
            fullWidth={false}
          >
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  );
};

type YearSelectorProps = {
  period: Period;
  setPeriod: (period: Period) => void;
  years: HistoryPeriodsResponseType;
};

function YearSelector({ period, setPeriod, years }: YearSelectorProps) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) => {
        setPeriod({
          month: period.month,
          year: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px] ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type MonthSelectorProps = {
  period: Period;
  setPeriod: (period: Period) => void;
};

function MonthSelector({ period, setPeriod }: MonthSelectorProps) {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({
          year: period.year,
          month: parseInt(value),
        });
      }}
    >
      <SelectTrigger className="w-[180px] ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthString = new Date(period.year, month, 1).toLocaleString(
            "default",
            { month: "long" },
          );

          return (
            <SelectItem key={month} value={month.toString()}>
              {monthString}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
