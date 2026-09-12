import React from "react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#0F766E", "#059669", "#F97316", "#7C3AED", "#0284C7", "#D97706"];

function ChartShell({ title, description, children, height = 280 }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>{children}</ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function TrendChart({ title, description, data, xKey, yKey, color = "#0F766E" }) {
  return (
    <ChartShell title={title} description={description}>
      <LineChart data={data} margin={{ left: -20, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: color }} />
      </LineChart>
    </ChartShell>
  );
}

export function BarTrendChart({ title, description, data, xKey, yKey, color = "#059669" }) {
  return (
    <ChartShell title={title} description={description}>
      <BarChart data={data} margin={{ left: -20, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
        <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartShell>
  );
}

export function SkillRadarChart({ title, description, data }) {
  return (
    <ChartShell title={title} description={description} height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "#64748B" }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} />
        <Radar name="Required" dataKey="required" stroke="#F97316" fill="#F97316" fillOpacity={0.15} />
        <Radar name="Current" dataKey="current" stroke="#0F766E" fill="#0F766E" fillOpacity={0.3} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
      </RadarChart>
    </ChartShell>
  );
}

export function IndustryPieChart({ title, description, data }) {
  return (
    <ChartShell title={title} description={description} height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} />
      </PieChart>
    </ChartShell>
  );
}
