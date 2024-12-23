import React from 'react';
import { DeviceList } from '../components/devices/DeviceList';
import { DeviceForm } from '../components/devices/DeviceForm';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Device } from '../types';
import { useEmployees } from '../hooks/useEmployees';

export const DeviceManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [editingDevice, setEditingDevice] = React.useState<Device | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = React.useState('');
  const { data: employees } = useEmployees();

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDevice(null);
  };

  const inputClasses = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-foreground">Device Management</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDevice ? 'Edit Device' : 'Add New Device'}
              </DialogTitle>
            </DialogHeader>
            <DeviceForm 
              onSuccess={handleClose}
              initialData={editingDevice || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-muted-foreground">
              Filter by Owner:
            </div>
            <select
              value={selectedOwnerId}
              onChange={(e) => setSelectedOwnerId(e.target.value)}
              className={inputClasses + " w-64"}
            >
              <option value="">All Devices</option>
              <option value="unassigned">Unassigned</option>
              {employees?.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DeviceList 
          onEdit={handleEdit}
          selectedOwnerId={selectedOwnerId}
        />
      </div>
    </div>
  );
};
