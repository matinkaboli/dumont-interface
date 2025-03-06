'use client';

import { MouseEvent, useRef, useState } from 'react';
import { CategoricalChartState } from 'recharts/types/chart/types';
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Data {
  time: number;

  [key: string]: number | string;
}

interface FormattedTeam {
  name: string;
  label: string;
  color: string;
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: Data;
  dataKey?: string;
  data: Data[];
  teams: FormattedTeam[];
}

interface Props {
  teams: { name: string; label: string }[];
  data: Data[];
}

const colors = ['#A215A2', '#BD7E06', '#5100FE'];
const lineColor = '#252525';
const axisColor = '#858585';

const formatAxisTime = (timestamp: string) => dayjs(timestamp).format('h:mm a');

const formatTooltipTime = (timestamp: string) => dayjs(timestamp).format('MMM D, YYYY h:mm a');

const CustomDot = (props: CustomDotProps) => {
  const { cx, cy, payload, dataKey, data, teams } = props;
  const colors = Object.fromEntries(teams.map((t: FormattedTeam) => [t.name, t.color]));

  // Only render the dot at the last data point
  if (payload!.time === data[data.length - 1].time) {
    return <circle cx={cx} cy={cy} r={4.5} fill={colors[dataKey!]} />;
  }
  return null;
};

const TeamChart = ({ teams, data }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activePayload, setActivePayload] = useState<any>(null);
  const [cursorX, setCursorX] = useState(0);

  const formattedTeams = teams.map((team, index) => ({
    ...team,
    color: colors[index],
  }));

  const allValues = data.flatMap((d) => teams.flatMap((team) => d[team.name] as number));
  const minDomainValue = Math.min(...allValues);
  const maxDomainValue = Math.max(...allValues);

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
        {formattedTeams.map((team) => (
          <div key={team.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: team.color }} />
            <span className="text-sm font-medium text-neutral-200">{team.label}</span>
          </div>
        ))}
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
              data={data}
              margin={{ top: 8, right: 0, left: 8, bottom: 0 }}
              onMouseMove={onMouseMoveLineChart}
            >
              {[20, 25, 30, 35, 40, 45, 50, 55].map((tick) => (
                <ReferenceLine
                  key={`line-${tick}`}
                  y={tick}
                  stroke={lineColor}
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              ))}

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: axisColor, fontSize: 12 }}
                tickMargin={10}
                tickFormatter={(value) => `${formatAxisTime(value)}`}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={8}
                tick={{ fill: axisColor, fontSize: 12 }}
                domain={[minDomainValue, maxDomainValue]}
                orientation="right"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={() => null} cursor={{ stroke: lineColor, strokeWidth: 1 }} />

              {formattedTeams.map((team) => (
                <Line
                  key={team.name}
                  type="monotone"
                  dataKey={team.name}
                  stroke={team.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: team.color, stroke: '#fff', strokeWidth: 1 }}
                  name={team.name}
                  animationDuration={1000}
                  isAnimationActive={true}
                  connectNulls={true}
                />
              ))}

              {formattedTeams.map((team) => (
                <Line
                  key={`dot-${team.name}`}
                  dataKey={team.name}
                  stroke="transparent"
                  dot={<CustomDot teams={formattedTeams} data={data} />}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {activePayload && activePayload.length > 0 && (
          <div
            className="absolute text-neutral-400 text-xs font-medium whitespace-nowrap"
            style={{ left: cursorX + 20, top: -2 }}
          >
            {formatTooltipTime(activePayload[0].payload.time)}
          </div>
        )}

        {activePayload?.map((entry: any, index: number) => {
          const dataKey = entry.dataKey;
          const team = formattedTeams.find((t) => t.name === dataKey);

          if (!team) return null;

          return (
            <div
              key={`tooltip-${index}`}
              className="absolute px-2 py-0.5 rounded-full text-neutral-100 text-xs font-medium whitespace-nowrap pointer-events-none"
              style={{ backgroundColor: team.color, left: cursorX + 20, top: 20 + index * 30 }}
            >
              {`${entry.value}% ${team.label}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamChart;
