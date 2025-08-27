import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  StarOff,
  RotateCcw,
  GripVertical,
  Check,
  X,
  Eye,
  Settings,
  Save,
  AlertCircle
} from 'lucide-react';
import { pricingAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface PricingPlan {
  _id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  popular: boolean;
  features: string[];
  cta: string;
  note?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  updatedBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface PlanFormData {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  popular: boolean;
  features: string[];
  cta: string;
  note: string;
  order: number;
}

const PricingManagement: React.FC = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [newFeature, setNewFeature] = useState('');
  const [formData, setFormData] = useState<PlanFormData>({
    name: '',
    price: '',
    priceNote: '',
    description: '',
    popular: false,
    features: [],
    cta: '',
    note: '',
    order: 0,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to get all pricing plans
  const { data: plansData, isLoading, error } = useQuery({
    queryKey: ['admin-pricing-plans'],
    queryFn: () => pricingAPI.getAdminPlans(),
  });

  const plans = plansData?.data?.data?.plans || [];
  const activePlans = plans.filter((plan: PricingPlan) => plan.isActive);
  const inactivePlans = plans.filter((plan: PricingPlan) => !plan.isActive);

  // Mutations
  const createPlanMutation = useMutation({
    mutationFn: pricingAPI.createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Pricing plan created successfully',
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create pricing plan',
        variant: 'destructive',
      });
    },
  });

  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => pricingAPI.updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Pricing plan updated successfully',
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update pricing plan',
        variant: 'destructive',
      });
    },
  });

  const togglePopularMutation = useMutation({
    mutationFn: pricingAPI.togglePopular,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Popular status updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update popular status',
        variant: 'destructive',
      });
    },
  });

  const deletePlanMutation = useMutation({
    mutationFn: pricingAPI.deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Pricing plan deactivated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to deactivate pricing plan',
        variant: 'destructive',
      });
    },
  });

  const restorePlanMutation = useMutation({
    mutationFn: pricingAPI.restorePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Pricing plan restored successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to restore pricing plan',
        variant: 'destructive',
      });
    },
  });

  const reorderPlansMutation = useMutation({
    mutationFn: pricingAPI.reorderPlans,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] });
      toast({
        title: 'Success',
        description: 'Plans reordered successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to reorder plans',
        variant: 'destructive',
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      priceNote: '',
      description: '',
      popular: false,
      features: [],
      cta: '',
      note: '',
      order: 0,
    });
    setEditingPlan(null);
    setNewFeature('');
  };

  const openEditDialog = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      priceNote: plan.priceNote || '',
      description: plan.description,
      popular: plan.popular,
      features: [...plan.features],
      cta: plan.cta,
      note: plan.note || '',
      order: plan.order,
    });
    setIsEditDialogOpen(true);
  };

  const addFeature = () => {
    if (newFeature.trim() && formData.features.length < 10) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.features.length === 0) {
      toast({
        title: 'Error',
        description: 'At least one feature is required',
        variant: 'destructive',
      });
      return;
    }

    if (editingPlan) {
      updatePlanMutation.mutate({ id: editingPlan._id, data: formData });
    } else {
      createPlanMutation.mutate(formData);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(activePlans);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedPlans = items.map((plan: any, index: number) => ({
      id: plan._id,
      order: index,
    }));

    reorderPlansMutation.mutate(reorderedPlans);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 text-lg">Failed to load pricing plans</p>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-pricing-plans'] })}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Pricing Management</h1>
          <p className="text-gray-400 mt-2">Manage your pricing plans and offerings</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              disabled={activePlans.length >= 3}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Pricing Plan</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new pricing plan to your website
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">Plan Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., Starter"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-white">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., ₹8k–₹25k"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="priceNote" className="text-white">Price Note (Optional)</Label>
                <Input
                  id="priceNote"
                  value={formData.priceNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceNote: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="e.g., Starting from ₹8,000"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Brief description of the plan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta" className="text-white">CTA Button Text</Label>
                  <Input
                    id="cta"
                    value={formData.cta}
                    onChange={(e) => setFormData(prev => ({ ...prev, cta: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., Choose Starter"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order" className="text-white">Order (0-2)</Label>
                  <Input
                    id="order"
                    type="number"
                    min="0"
                    max="2"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="note" className="text-white">Note (Optional)</Label>
                <Input
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="e.g., Custom features available on request"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
                />
                <Label htmlFor="popular" className="text-white">Mark as Popular</Label>
              </div>

              <div>
                <Label className="text-white">Features</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button 
                      type="button" 
                      onClick={addFeature}
                      className="bg-teal-600 hover:bg-teal-700"
                      disabled={!newFeature.trim() || formData.features.length >= 10}
                    >
                      Add
                    </Button>
                  </div>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded border border-gray-600">
                      <span className="text-white text-sm">{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createPlanMutation.isPending}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  {createPlanMutation.isPending ? 'Creating...' : 'Create Plan'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{plans.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{activePlans.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Popular Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-orange-400">
              {activePlans.find(plan => plan.popular)?.name || 'None'}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Inactive Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-400">{inactivePlans.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-teal-600">
            All Plans ({plans.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-teal-600">
            Active ({activePlans.length})
          </TabsTrigger>
          {inactivePlans.length > 0 && (
            <TabsTrigger value="inactive" className="data-[state=active]:bg-teal-600">
              Inactive ({inactivePlans.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="all">
          <PlansList 
            plans={plans}
            onEdit={openEditDialog}
            onTogglePopular={togglePopularMutation.mutate}
            onDelete={deletePlanMutation.mutate}
            onRestore={restorePlanMutation.mutate}
            onDragEnd={handleDragEnd}
            showDragDrop={false}
          />
        </TabsContent>

        <TabsContent value="active">
          <PlansList 
            plans={activePlans}
            onEdit={openEditDialog}
            onTogglePopular={togglePopularMutation.mutate}
            onDelete={deletePlanMutation.mutate}
            onRestore={restorePlanMutation.mutate}
            onDragEnd={handleDragEnd}
            showDragDrop={true}
          />
        </TabsContent>

        {inactivePlans.length > 0 && (
          <TabsContent value="inactive">
            <PlansList 
              plans={inactivePlans}
              onEdit={openEditDialog}
              onTogglePopular={togglePopularMutation.mutate}
              onDelete={deletePlanMutation.mutate}
              onRestore={restorePlanMutation.mutate}
              onDragEnd={handleDragEnd}
              showDragDrop={false}
            />
          </TabsContent>
        )}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Pricing Plan</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify the pricing plan details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Same form fields as create dialog */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name" className="text-white">Plan Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-price" className="text-white">Price</Label>
                <Input
                  id="edit-price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-priceNote" className="text-white">Price Note (Optional)</Label>
              <Input
                id="edit-priceNote"
                value={formData.priceNote}
                onChange={(e) => setFormData(prev => ({ ...prev, priceNote: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="edit-description" className="text-white">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-cta" className="text-white">CTA Button Text</Label>
                <Input
                  id="edit-cta"
                  value={formData.cta}
                  onChange={(e) => setFormData(prev => ({ ...prev, cta: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-order" className="text-white">Order (0-2)</Label>
                <Input
                  id="edit-order"
                  type="number"
                  min="0"
                  max="2"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-note" className="text-white">Note (Optional)</Label>
              <Input
                id="edit-note"
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-popular"
                checked={formData.popular}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
              />
              <Label htmlFor="edit-popular" className="text-white">Mark as Popular</Label>
            </div>

            <div>
              <Label className="text-white">Features</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button 
                    type="button" 
                    onClick={addFeature}
                    className="bg-teal-600 hover:bg-teal-700"
                    disabled={!newFeature.trim() || formData.features.length >= 10}
                  >
                    Add
                  </Button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded border border-gray-600">
                    <span className="text-white text-sm">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updatePlanMutation.isPending}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {updatePlanMutation.isPending ? 'Updating...' : 'Update Plan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Plans List Component
interface PlansListProps {
  plans: PricingPlan[];
  onEdit: (plan: PricingPlan) => void;
  onTogglePopular: (id: string) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onDragEnd: (result: any) => void;
  showDragDrop: boolean;
}

const PlansList: React.FC<PlansListProps> = ({
  plans,
  onEdit,
  onTogglePopular,
  onDelete,
  onRestore,
  showDragDrop,
}) => {
  if (plans.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="text-center py-12">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No pricing plans found</p>
          <p className="text-gray-500 text-sm mt-2">Create your first pricing plan to get started</p>
        </CardContent>
      </Card>
    );
  }

  const PlanCard = ({ plan, index }: { plan: PricingPlan; index: number }) => (
    <Card className={`bg-gray-800/50 border-gray-700 ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showDragDrop && (
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
            )}
            <CardTitle className="text-white">{plan.name}</CardTitle>
            {plan.popular && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            {!plan.isActive && (
              <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                Inactive
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{plan.price}</div>
            <div className="text-xs text-gray-400">Order: {plan.order}</div>
          </div>
        </div>
        <CardDescription className="text-gray-400">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Features ({plan.features.length})</h4>
            <div className="space-y-1">
              {plan.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center text-sm text-gray-300">
                  <Check className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
              {plan.features.length > 3 && (
                <div className="text-xs text-gray-400">
                  +{plan.features.length - 3} more features
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(plan)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Edit2 className="h-3 w-3 mr-1" />
              Edit
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTogglePopular(plan._id)}
              className={`border-gray-600 hover:bg-gray-700 ${
                plan.popular 
                  ? 'text-orange-300 border-orange-500/30' 
                  : 'text-gray-300'
              }`}
            >
              {plan.popular ? (
                <>
                  <StarOff className="h-3 w-3 mr-1" />
                  Unpopular
                </>
              ) : (
                <>
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </>
              )}
            </Button>

            {plan.isActive ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Deactivate
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-900 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Deactivate Pricing Plan</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Are you sure you want to deactivate "{plan.name}"? This will remove it from your website but keep it in your database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-600 text-gray-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => onDelete(plan._id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Deactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRestore(plan._id)}
                className="border-green-600 text-green-400 hover:bg-green-600/10"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Restore
              </Button>
            )}
          </div>

          {(plan.priceNote || plan.note) && (
            <div className="pt-2 border-t border-gray-600">
              {plan.priceNote && (
                <p className="text-xs text-gray-400">Price: {plan.priceNote}</p>
              )}
              {plan.note && (
                <p className="text-xs text-gray-400">Note: {plan.note}</p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-600 text-xs text-gray-500">
            <span>CTA: {plan.cta}</span>
            <span>
              Updated {new Date(plan.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (showDragDrop) {
    return (
      <div className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm flex items-center">
            <GripVertical className="h-4 w-4 mr-2" />
            Drag and drop to reorder plans (feature coming soon)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={plan._id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <PlanCard key={plan._id} plan={plan} index={index} />
      ))}
    </div>
  );
};

export default PricingManagement;
