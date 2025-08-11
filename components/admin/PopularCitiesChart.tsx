"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from "recharts"

interface CityData {
  name: string
  value: number
  color: string
}

interface PopularCitiesChartProps {
  data: CityData[]
  title?: string
}

export function PopularCitiesChart({ data, title = "Popular Cities" }: PopularCitiesChartProps) {
  return (
    <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#8E9C78' }}>
      <CardHeader>
        <CardTitle style={{ color: '#000000' }}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #8E9C78',
                    borderRadius: '8px',
                    color: '#000000'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {data.map((city, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: city.color }}
                  />
                  <span className="font-medium" style={{ color: '#000000' }}>{city.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm" style={{ color: '#929292' }}>{city.value}%</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
              <div className="text-center text-sm" style={{ color: '#929292' }}>
                Total: {data.reduce((sum, city) => sum + city.value, 0)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
