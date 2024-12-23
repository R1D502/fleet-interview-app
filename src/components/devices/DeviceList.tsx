import React from 'react';
import { useDevices, useDeleteDevice } from '../../hooks/useDevices';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useEmployees } from '../../hooks/useEmployees';
import { Device } from '../../types';

interface DeviceListProps {
  onEdit: (device: Device) => void;
  selectedOwnerId: string;
}

export const DeviceList = ({ onEdit, selectedOwnerId }: DeviceListProps) => {
  const { data: devices, isLoading } = useDevices();
  const { data: employees } = useEmployees();
  const deleteDevice = useDeleteDevice();

  const getEmployeeName = (ownerId: number | null) => {
    if (!ownerId) return 'Unassigned';
    const employee = employees?.find(emp => emp.id === ownerId);
    return employee ? employee.name : 'Unknown';
  };

  const filteredDevices = React.useMemo(() => {
    if (!devices) return [];
    if (!selectedOwnerId) return devices;
    
    if (selectedOwnerId === 'unassigned') {
      return devices.filter(device => !device.owner_id);
    }
    
    return devices.filter(device => 
      device.owner_id === parseInt(selectedOwnerId)
    );
  }, [devices, selectedOwnerId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="px-6">
        <div className="grid grid-cols-4 border-b pb-4">
          <div className="text-sm font-medium text-muted-foreground">Name</div>
          <div className="text-sm font-medium text-muted-foreground">Type</div>
          <div className="text-sm font-medium text-muted-foreground">Owner</div>
          <div className="text-sm font-medium text-muted-foreground text-right">Actions</div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredDevices.map((device) => (
          <div key={device.id} className="grid grid-cols-4 px-6 py-4 hover:bg-muted/50">
            <div className="text-sm font-medium text-foreground">{device.device_name}</div>
            <div className="text-sm text-muted-foreground">{device.type}</div>
            <div className="text-sm text-muted-foreground">{getEmployeeName(device.owner_id)}</div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(device)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => deleteDevice.mutate(device.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(!filteredDevices || filteredDevices.length === 0) && (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            {selectedOwnerId ? 'No devices found for selected owner.' : 'No devices found. Add a device to get started.'}
          </div>
        )}
      </div>
    </div>
  );
};
