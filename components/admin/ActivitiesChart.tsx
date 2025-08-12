"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts"

interface ActivityData {
  activity: string
  count: number
  color?: string
}

interface ActivitiesChartProps {
  data: ActivityData[]
  title?: string
}

export function ActivitiesChart({ data, title = "Popular Activities" }: ActivitiesChartProps) {
  return (
    <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#8E9C78' }}>
      <CardHeader>
        <CardTitle style={{ color: '#000000' }}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
              <XAxis 
                dataKey="activity" 
                stroke="#929292"
                tick={{ fill: '#929292' }}
              />
              <YAxis 
                stroke="#929292"
                tick={{ fill: '#929292' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #8E9C78',
                  borderRadius: '8px',
                  color: '#000000'
                }}
                formatter={(value: number) => [value, 'Count']}
              />
              <Bar 
                dataKey="count" 
                fill="#8E9C78" 
                radius={[4, 4, 0, 0]}
                stroke="#485C11"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {data.reduce((sum, item) => sum + item.count, 0)}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Total Activities</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {Math.max(...data.map(item => item.count))}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Most Popular</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {Math.round(data.reduce((sum, item) => sum + item.count, 0) / data.length)}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Average</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
