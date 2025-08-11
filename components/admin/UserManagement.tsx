"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  trips: number
  status: "active" | "inactive"
  avatar: string
  lastActive?: string
  joinDate?: string
}

interface UserManagementProps {
  users: User[]
  onEditUser?: (user: User) => void
  onDeleteUser?: (userId: number) => void
  onViewUser?: (user: User) => void
}

export function UserManagement({ 
  users, 
  onEditUser, 
  onDeleteUser, 
  onViewUser 
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
            <div key={user.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E9ECEF' }}>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback style={{ backgroundColor: '#8E9C78', color: '#FFFFFF' }}>
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold" style={{ color: '#000000' }}>{user.name}</h3>
                  <p className="text-sm" style={{ color: '#929292' }}>{user.email}</p>
                  {user.lastActive && (
                    <p className="text-xs" style={{ color: '#929292' }}>Last active: {user.lastActive}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    style={{ 
                      backgroundColor: user.status === 'active' ? '#8E9C78' : '#C7B697',
                      color: '#FFFFFF'
                    }}
                  >
                    {user.status}
                  </Badge>
                  <div className="text-sm mt-1" style={{ color: '#929292' }}>{user.trips} trips</div>
                </div>
                <div className="flex gap-2">
                  {onViewUser && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: '#8E9C78' }}
                      onClick={() => onViewUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEditUser && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: '#8E9C78' }}
                      onClick={() => onEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {onDeleteUser && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      style={{ color: '#485C11' }}
                      onClick={() => onDeleteUser(user.id)}
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
