"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/shad/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../@/shad/ui/chart";

// Define the type for a transaction
interface Transaction {
  amount: number;
  time: string; // ISO date string
  name: string;
  type: "send" | "received";
  number: string;
  email: string | null;
}

// Define the type for the processed data
interface DailyTotal {
  date: string;
  send: number;
  received: number;
}

// Utility function to process the transactions
const processTransactions = (transactions: Transaction[]): DailyTotal[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Filter transactions from the last 7 days
  const recentTransactions = transactions.filter(
    (transaction: any) => new Date(transaction.time) >= sevenDaysAgo
  );

  // Aggregate data by day
  const dailyTotals = recentTransactions.reduce<Record<string, DailyTotal>>(
    (acc: any, transaction: any) => {
      const date: any = new Date(transaction.time).toISOString().split("T")[0];

      // TypeScript type-safe access and update
      if (!acc[date]) {
        acc[date] = { date, send: 0, received: 0 };
      }
      const amount = transaction.amount / 100; // Convert amount to the correct scale
      if (transaction.type === "send") {
        acc[date].send += amount;
      } else if (transaction.type === "received") {
        acc[date].received += amount;
      }

      return acc;
    },
    {}
  );

  // Convert the aggregated data into an array and sort it by date
  return Object.values(dailyTotals).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

const chartConfig = {
  send: {
    label: "Send",
    color: "hsl(var(--chart-1))",
  },
  received: {
    label: "Received",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface BarComponentProps {
  transactions: Transaction[]; // Array of transactions passed as prop
}

export function BarComponent({ transactions }: BarComponentProps) {
  // Process the transactions to get the data for the last 7 days
  const chartData = processTransactions(transactions);

  return (
    <Card className="bg-white ">
      <CardHeader>
        <CardTitle>Visual Representation of Your Transactions</CardTitle>
        <CardDescription>Past 7 Days (Money Send & Receive)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="dashed" className="bg-white" />
              }
            />
            <Bar dataKey="send" fill="var(--color-send)" radius={4} />
            <Bar dataKey="received" fill="var(--color-received)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total money sent and received for the past 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
