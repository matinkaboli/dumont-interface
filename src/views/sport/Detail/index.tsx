'use client';

import { MouseEvent, useRef, useState } from 'react';
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/types';

interface ForecastDataPoint {
  time: string;
  realMadrid: number;
  barcelona: number;
  draw: number;
}

const sampleData: ForecastDataPoint[] = [
  { time: '0', realMadrid: 47, draw: 38, barcelona: 42 },
  { time: '5', realMadrid: 47.5, draw: 41, barcelona: 41 },
  { time: '10', realMadrid: 48, draw: 45, barcelona: 40 },
  { time: '15', realMadrid: 50, draw: 48, barcelona: 44 },
  { time: '20', realMadrid: 53, draw: 52, barcelona: 48 },
  { time: '25', realMadrid: 52.5, draw: 52, barcelona: 48 },
  { time: '30', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '35', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '40', realMadrid: 52, draw: 52, barcelona: 48 },
  { time: '45', realMadrid: 50, draw: 52, barcelona: 48 },
  { time: '50', realMadrid: 48, draw: 52, barcelona: 48 },
  { time: '55', realMadrid: 51, draw: 51, barcelona: 47 },
  { time: '60', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '65', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '70', realMadrid: 54, draw: 50, barcelona: 46 },
  { time: '75', realMadrid: 54.5, draw: 50, barcelona: 46 },
  { time: '80', realMadrid: 55, draw: 50, barcelona: 46 },
  { time: '85', realMadrid: 55, draw: 50, barcelona: 51 },
  { time: '90', realMadrid: 55, draw: 50, barcelona: 56 },
];

const colors = {
  realMadrid: '#A215A2',
  draw: '#BD7E06',
  barcelona: '#5100FE',
};

const CustomDot = (props: any) => {
  const { cx, cy, payload, dataKey } = props;

  // Only render the dot at the last data point
  if (payload.time === sampleData[sampleData.length - 1].time) {
    return <circle cx={cx} cy={cy} r={4.5} fill={colors[dataKey as keyof typeof colors]} />;
  }
  return null;
};

const Detail = () => {
  const [activePayload, setActivePayload] = useState<any>(null);
  const [cursorX, setCursorX] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  const tooltipLabels = {
    realMadrid: 'Real Madrid',
    barcelona: 'Barcelona',
    draw: 'Draw',
  };

  const onMouseLeaveRef = () => setActivePayload(null);

  const onMouseMoveRef = (e: MouseEvent<HTMLDivElement>) => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
    }
  };

  const onMouseMoveLineChart = (e: CategoricalChartState) => {
    if (e.activePayload && e.activeLabel) {
      const filteredPayload = e.activePayload?.filter(
        (entry: any) => entry.color !== 'transparent',
      );
      setActivePayload(filteredPayload);
    }
  };

  return (
    <div className="bg-secondary-900 border-[1.5px] border-neutral-700 px-6 py-5 rounded-lg">
      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.realMadrid }} />
          <span className="text-sm font-medium text-neutral-200">Real Madrid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.draw }} />
          <span className="text-sm font-medium text-neutral-200">Draw</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.barcelona }} />
          <span className="text-sm font-medium text-neutral-200">Barcelona</span>
        </div>
      </div>

      <div className="relative h-[300px] mt-5">
        <div
          ref={chartRef}
          className="w-full h-full"
          onMouseLeave={onMouseLeaveRef}
          onMouseMove={onMouseMoveRef}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sampleData}
              margin={{ top: 8, right: 0, left: 8, bottom: 0 }}
              onMouseMove={onMouseMoveLineChart}
            >
              <defs>
                <linearGradient id="realMadridGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.realMadrid} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={colors.realMadrid} stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Generate horizontal dotted grid lines */}
              {[20, 25, 30, 35, 40, 45, 50, 55].map((tick) => (
                <ReferenceLine
                  key={`line-${tick}`}
                  y={tick}
                  stroke="#252525"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              ))}

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#858585', fontSize: 12 }}
                tickMargin={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={8}
                tick={{ fill: '#858585', fontSize: 12 }}
                domain={[20, 55]}
                orientation="right"
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                content={() => null}
                cursor={{ stroke: '#252525', strokeWidth: 1 }}
              />

              <Line
                type="monotone"
                dataKey="realMadrid"
                stroke={colors.realMadrid}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: colors.realMadrid, stroke: '#fff', strokeWidth: 1 }}
                name={tooltipLabels.realMadrid}
                animationDuration={1000}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="draw"
                stroke={colors.draw}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: colors.draw, stroke: '#fff', strokeWidth: 1 }}
                name={tooltipLabels.draw}
                animationDuration={1000}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="barcelona"
                stroke={colors.barcelona}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: colors.barcelona, stroke: '#fff', strokeWidth: 1 }}
                name={tooltipLabels.barcelona}
                animationDuration={1000}
                isAnimationActive={true}
              />

              {/* Custom dot components for the last data point */}
              <Line dataKey="realMadrid" stroke="transparent" dot={<CustomDot />} />
              <Line dataKey="draw" stroke="transparent" dot={<CustomDot />} />
              <Line dataKey="barcelona" stroke="transparent" dot={<CustomDot />} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {activePayload?.map((entry: any, index: number) => {
          const dataKey = entry.dataKey as keyof typeof colors;
          const color = colors[dataKey];

          const labelText = {
            realMadrid: 'Real Madrid',
            draw: 'Draw',
            barcelona: 'Barcelona',
          }[dataKey];

          return (
            <div
              key={`tooltip-${index}`}
              className="absolute px-2 py-0.5 rounded-full text-neutral-100 text-xs font-medium whitespace-nowrap pointer-events-none"
              style={{
                backgroundColor: color,
                left: cursorX + 20,
                top: 20 + index * 30,
              }}
            >
              {`${entry.value}% ${labelText}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Detail;
