import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Calendar, 
  Activity, 
  Shield, 
  Key,
  Clock,
  Edit,
  Save,
  X
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface UserProfileProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin: string | null;
  profileImage?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserData>>({});

  // Fetch user details
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['admin-user', userId],
    queryFn: () => adminAPI.getUser(userId),
    enabled: isOpen && !!userId,
    staleTime: 30000
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (data: any) => adminAPI.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user', userId] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      toast.success('User updated successfully');
      setIsEditing(false);
      setEditData({});
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      const firstDetail = error.response?.data?.errors?.[0]?.msg;
      toast.error(firstDetail || msg || 'Failed to update user');
    }
  });

  const user = userData?.data?.user;

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      role: user?.role || 'viewer',
      isActive: user?.isActive ?? true
    });
  };

  const handleSave = () => {
    updateUserMutation.mutate(editData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500 text-white';
      case 'editor': return 'bg-blue-500 text-white';
      case 'viewer': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPermissions = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          'Full system access',
          'User management',
          'Content management',
          'System settings',
          'Analytics & reports'
        ];
      case 'editor':
        return [
          'Content creation',
          'Content editing',
          'Media uploads',
          'Portfolio management'
        ];
      case 'viewer':
        return [
          'Read-only access',
          'View content',
          'View portfolio'
        ];
      default:
        return ['No permissions assigned'];
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            View and manage user account details, permissions, and activity.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gray-700 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-700 rounded animate-pulse w-48" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">Failed to load user data</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.profileImage} alt={user.fullName} />
                  <AvatarFallback className="bg-teal-600 text-white text-lg">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge className={user.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-gray-400">@{user.username}</p>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} variant="outline" className="border-gray-600 text-gray-300">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleSave} 
                      disabled={updateUserMutation.isPending}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="border-gray-600 text-gray-300">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="details" className="data-[state=active]:bg-teal-600">Details</TabsTrigger>
                <TabsTrigger value="permissions" className="data-[state=active]:bg-teal-600">Permissions</TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-teal-600">Activity</TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-teal-600">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-gray-400">
                      Basic user account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">First Name</Label>
                          <Input
                            value={editData.firstName || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Last Name</Label>
                          <Input
                            value={editData.lastName || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Email</Label>
                          <Input
                            type="email"
                            value={editData.email || ''}
                            onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Role</Label>
                          <Select 
                            value={editData.role} 
                            onValueChange={(value) => setEditData(prev => ({ ...prev, role: value as any }))}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="viewer">Viewer</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2 flex items-center space-x-2">
                          <Switch
                            checked={editData.isActive ?? true}
                            onCheckedChange={(checked) => setEditData(prev => ({ ...prev, isActive: checked }))}
                          />
                          <Label className="text-gray-300">Account Active</Label>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Username:</span>
                            <span className="text-white">{user.username}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{user.email}</span>
                            {user.emailVerified && (
                              <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Role:</span>
                            <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Joined:</span>
                            <span className="text-white">
                              {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Last Login:</span>
                            <span className="text-white">
                              {user.lastLogin 
                                ? formatDistanceToNow(new Date(user.lastLogin), { addSuffix: true })
                                : 'Never'
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">Status:</span>
                            <Badge className={user.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Role Permissions</CardTitle>
                    <CardDescription className="text-gray-400">
                      Current role: <span className="text-white font-medium">{user.role}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getPermissions(user.role).map((permission, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-teal-500 rounded-full" />
                          <span className="text-gray-300">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-400">
                      User login and activity history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-white">Account created</span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {format(new Date(user.createdAt), 'MMM dd, yyyy HH:mm')}
                        </span>
                      </div>
                      {user.lastLogin && (
                        <div className="flex items-center justify-between p-3 bg-gray-600/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-white">Last login</span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {format(new Date(user.lastLogin), 'MMM dd, yyyy HH:mm')}
                          </span>
                        </div>
                      )}
                      <div className="text-center py-4 text-gray-500">
                        <p>More detailed activity logs coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Account security and authentication settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Email Verification</Label>
                        <div className="flex items-center gap-2">
                          <Badge className={user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}>
                            {user.emailVerified ? 'Verified' : 'Pending'}
                          </Badge>
                          {!user.emailVerified && (
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              Send Verification Email
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Password</Label>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          <Key className="h-4 w-4 mr-2" />
                          Reset Password
                        </Button>
                      </div>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Account Security</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <p>• Account created: {format(new Date(user.createdAt), 'MMM dd, yyyy')}</p>
                        <p>• Last updated: {format(new Date(user.updatedAt), 'MMM dd, yyyy')}</p>
                        <p>• Two-factor authentication: Not enabled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
