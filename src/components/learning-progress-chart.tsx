'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartData = {
  name: string;
  completed: number;
};

const chartConfig = {
  completed: {
    label: 'Completed',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

type LearningProgressChartProps = {
  data: ChartData[];
};

export default function LearningProgressChart({ data }: LearningProgressChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <YAxis
            dataKey="name"
            type="category"
            width={90}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            content={<ChartTooltipContent
                formatter={(value, name) => (
                    <div className="flex flex-col">
                        <span className="font-medium">{name === 'completed' ? 'Progress' : name}</span>
                        <span>{value}% Complete</span>
                    </div>
                )}
            />}
          />
          <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
