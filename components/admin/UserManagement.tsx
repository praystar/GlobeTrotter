"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface User {
  user_id: string
  email: string
  role: "USER" | "ADMIN"
  created_at: string
  updated_at: string
  profile_photo_url?: string
  trips: number
}

interface UserManagementProps {
  users: User[]
  onDeleteUser?: (userId: string) => void
}

export function UserManagement({ 
  users, 
  onDeleteUser
}: UserManagementProps) {
  return (
    <Card style={{ backgroundColor: '#FFFFFF', borderColor: '#8E9C78' }}>
      <CardHeader>
        <CardTitle style={{ color: '#000000' }} className="flex items-center justify-between">
          User Management
          <div className="text-sm" style={{ color: '#929292' }}>
            {users.length} total users
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.user_id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback style={{ backgroundColor: '#8E9C78', color: '#FFFFFF' }}>
                    {user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold" style={{ color: '#000000' }}>{user.email.split('@')[0]}</h3>
                  <p className="text-sm" style={{ color: '#929292' }}>{user.email}</p>
                  <p className="text-xs" style={{ color: '#929292' }}>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge 
                    variant="default"
                    style={{ 
                      backgroundColor: user.role === 'ADMIN' ? '#485C11' : '#8E9C78',
                      color: '#FFFFFF'
                    }}
                  >
                    {user.role}
                  </Badge>
                  <div className="text-sm mt-1" style={{ color: '#929292' }}>{user.trips} trips</div>
                </div>
                <div className="flex gap-2">
                  {onDeleteUser && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: '#485C11' }}
                      onClick={() => onDeleteUser(user.user_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
