import { Currencies } from "@/data/currency";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );
}

export function getFormatterForCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}
