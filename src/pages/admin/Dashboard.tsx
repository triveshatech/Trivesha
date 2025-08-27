import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adminAPI, portfolioAPI, pricingAPI, contactAPI } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Activity,
  Clock,
  Shield,
  Eye,
  Plus,
  Settings,
  FileText,
  Upload,
  BarChart3,
  FolderOpen,
  Star,
  DollarSign,
  Briefcase,
  Globe,
  UserPlus,
  Code,
  Palette,
  Smartphone,
  Layers,
  AlertCircle,
  CheckCircle,
  Gamepad2,
  PaintBucket,
  FolderPlus,
  MessageSquare,
  Mail,
  Calendar,
  Clock3
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminAPI.getStats(),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => adminAPI.getUsers(),
  });

  const { data: recentActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-recent-activity'],
    queryFn: () => adminAPI.getRecentActivity({ limit: 8 }),
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: contactStats, error: contactStatsError, isLoading: contactStatsLoading } = useQuery({
    queryKey: ['contact-stats'],
    queryFn: async () => {
      console.log('🔍 Fetching contact stats...');
      const result = await contactAPI.getStats();
      console.log('📊 Contact stats result:', result);
      return result;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: recentContacts, error: recentContactsError } = useQuery({
    queryKey: ['recent-contacts'],
    queryFn: async () => {
      console.log('🔍 Fetching recent contacts...');
      const result = await contactAPI.getAll({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' });
      console.log('📋 Recent contacts result:', result);
      return result;
    },
    refetchInterval: 60000, // Refresh every minute
  });

  // Debug logging
  React.useEffect(() => {
    if (contactStatsError) {
      console.error('❌ Contact stats error:', contactStatsError);
    }
    if (recentContactsError) {
      console.error('❌ Recent contacts error:', recentContactsError);
    }
  }, [contactStatsError, recentContactsError]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Failed to load dashboard data</p>
      </div>
    );
  }

  const statsData = stats?.data?.data || {};
  const contactStatsData = (contactStats as any)?.data?.data || {};

  // Debug logging for contact stats
  console.log('🔍 Contact stats data:', contactStatsData);
  console.log('🔍 Contact stats loading:', contactStatsLoading);
  console.log('🔍 Contact stats error:', contactStatsError);

  // Enhanced stat cards with project, pricing, and contact data
  const statCards = [
    // User Statistics
    {
      title: 'Total Users',
      value: statsData.totalUsers || 0,
      icon: Users,
      description: 'All registered users',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: `+${statsData.recentUsers || 0} this week`,
    },
    {
      title: 'Total Contacts',
      value: contactStatsData.total || 0,
      icon: MessageSquare,
      description: 'Contact form submissions',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      change: `${contactStatsData.recent || 0} this week`,
    },
    {
      title: 'New Contacts',
      value: contactStatsData.today || 0,
      icon: Mail,
      description: 'Submissions today',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      change: 'Requires attention',
    },
    {
      title: 'Total Projects',
      value: statsData.totalProjects || 0,
      icon: Briefcase,
      description: 'Portfolio projects',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      change: `${statsData.publishedProjects || 0} published`,
    },
    {
      title: 'Featured Projects',
      value: statsData.featuredProjects || 0,
      icon: Star,
      description: 'Highlighted projects',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      change: `${statsData.draftProjects || 0} drafts`,
    },
    {
      title: 'Pricing Plans',
      value: statsData.totalPricingPlans || 0,
      icon: DollarSign,
      description: 'Active pricing plans',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      change: `${statsData.activePricingPlans || 0} active`,
    },
    {
      title: 'Web Development',
      value: statsData.projectsByCategory?.['Web Development'] || 0,
      icon: Code,
      description: 'Web dev projects',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      change: 'Category stats',
    },
    {
      title: 'UI/UX Design',
      value: statsData.projectsByCategory?.['UI/UX Design'] || 0,
      icon: Palette,
      description: 'Design projects',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      change: 'Category stats',
    },
    {
      title: 'Mobile Apps',
      value: statsData.projectsByCategory?.['Mobile App'] || 0,
      icon: Smartphone,
      description: 'Mobile projects',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      change: 'Category stats',
    },
  ];

  // User role statistics
  const roleStats = [
    { role: 'Admin', count: statsData.adminUsers || 0, color: 'bg-red-500', icon: Shield },
    { role: 'Users', count: statsData.regularUsers || 0, color: 'bg-blue-500', icon: Users },
    { role: 'Inactive', count: statsData.inactiveUsers || 0, color: 'bg-gray-500', icon: UserX },
  ];

  // Project category statistics
  const projectCategoryStats = [
    { category: 'Web Development', count: statsData.projectsByCategory?.['Web Development'] || 0, color: 'bg-blue-500', icon: Code },
    { category: 'UI/UX Design', count: statsData.projectsByCategory?.['UI/UX Design'] || 0, color: 'bg-pink-500', icon: Palette },
    { category: 'Mobile App', count: statsData.projectsByCategory?.['Mobile App'] || 0, color: 'bg-indigo-500', icon: Smartphone },
    { category: 'Games', count: statsData.projectsByCategory?.['Games'] || 0, color: 'bg-green-500', icon: Gamepad2 },
    { category: 'Branding', count: statsData.projectsByCategory?.['Branding'] || 0, color: 'bg-purple-500', icon: PaintBucket },
  ];

  // Activity icon mapping
  const getActivityIcon = (iconName: string) => {
    const icons = {
      Users, UserPlus, Briefcase, FolderPlus, Settings, Star, Eye, Upload, 
      Plus, Activity, CheckCircle, AlertCircle, DollarSign
    };
    return icons[iconName as keyof typeof icons] || Activity;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <p className="text-xs text-gray-400 mb-1">{stat.description}</p>
              {stat.change && (
                <p className="text-xs text-gray-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Roles Distribution */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Roles
            </CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of users by role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roleStats.map((role) => (
                <div key={role.role} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${role.color} flex items-center justify-center`}>
                      <role.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{role.role}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-700 text-white">
                    {role.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Categories */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Project Categories
            </CardTitle>
            <CardDescription className="text-gray-400">
              Published projects by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectCategoryStats.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">{category.category}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gray-700 text-white">
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentActivity?.data?.data?.activities?.map((activity: any, index: number) => {
                  const IconComponent = getActivityIcon(activity.icon);
                  return (
                    <div key={index} className="flex items-start space-x-3 py-2">
                      <div className={`w-8 h-8 rounded-lg bg-${activity.color}-500/20 flex items-center justify-center mt-0.5`}>
                        <IconComponent className={`h-4 w-4 text-${activity.color}-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-xs truncate">{activity.details}</p>
                        <p className="text-gray-500 text-xs">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {recentActivity?.data?.data?.activities?.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Contacts */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Recent Contacts
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(recentContacts as any)?.data?.data ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {(recentContacts as any).data.data.map((contact: any) => (
                  <div key={contact._id} className="flex items-start space-x-3 py-2 border-b border-gray-700 last:border-b-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center mt-0.5">
                      <Mail className="h-4 w-4 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{contact.name}</p>
                      <p className="text-gray-400 text-xs truncate">{contact.email}</p>
                      <p className="text-gray-400 text-xs truncate">{contact.projectType || 'General Inquiry'}</p>
                      <p className="text-gray-500 text-xs">
                        {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Badge variant={contact.status === 'new' ? 'destructive' : 'secondary'} className="text-xs">
                      {contact.status}
                    </Badge>
                  </div>
                ))}
                {(recentContacts as any).data.data.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent contacts</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/admin/contacts')}
            >
              <MessageSquare className="h-6 w-6" />
              <span>View Contacts</span>
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/admin/portfolio')}
            >
              <Briefcase className="h-6 w-6" />
              <span>Add Project</span>
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white h-auto py-4 flex flex-col items-center space-y-2"
              onClick={() => navigate('/admin/pricing')}
            >
              <DollarSign className="h-6 w-6" />
              <span>Manage Pricing</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
