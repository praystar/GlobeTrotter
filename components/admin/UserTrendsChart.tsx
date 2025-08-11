"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"

interface TrendData {
  period: string
  users: number
  growth?: number
}

interface UserTrendsChartProps {
  data: TrendData[]
  title?: string
  showArea?: boolean
}

export function UserTrendsChart({ 
  data, 
  title = "User Trends and Analytics",
  showArea = false 
}: UserTrendsChartProps) {
  const maxUsers = Math.max(...data.map(item => item.users))
  const minUsers = Math.min(...data.map(item => item.users))
  const totalGrowth = ((data[data.length - 1]?.users || 0) - (data[0]?.users || 0)) / (data[0]?.users || 1) * 100

  return (
    <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#8E9C78' }}>
      <CardHeader>
        <CardTitle style={{ color: '#000000' }}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {showArea ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis 
                  dataKey="period" 
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
                  formatter={(value: number) => [value, 'Users']}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8E9C78" 
                  fill="#8E9C78"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              </AreaChart>
            ) : (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
                <XAxis 
                  dataKey="period" 
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
                  formatter={(value: number) => [value, 'Users']}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8E9C78" 
                  strokeWidth={3}
                  dot={{ fill: '#8E9C78', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#8E9C78', strokeWidth: 2, fill: '#8E9C78' }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {data[data.length - 1]?.users || 0}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Current Users</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {maxUsers}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Peak Users</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#000000' }}>
              {Math.round(data.reduce((sum, item) => sum + item.users, 0) / data.length)}
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Average</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
            <div className="text-2xl font-bold" style={{ color: '#485C11' }}>
              {totalGrowth >= 0 ? '+' : ''}{totalGrowth.toFixed(1)}%
            </div>
            <div className="text-sm" style={{ color: '#929292' }}>Growth</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
