import React from 'react';
import { useCreateDevice, useUpdateDevice } from '../../hooks/useDevices';
import { useEmployees } from '../../hooks/useEmployees';
import { Button } from '../ui/button';
import { DeviceType } from '../../types';
import { Plus } from 'lucide-react';

interface DeviceFormProps {
  onSuccess?: () => void;
  initialData?: {
    id: number;
    device_name: string;
    type: DeviceType;
    owner_id: number | null;
  };
  inline?: boolean;
}

const deviceTypes: DeviceType[] = ['Laptop', 'Display', 'Peripheral'];

export const DeviceForm = ({ onSuccess, initialData, inline = false }: DeviceFormProps) => {
  const [deviceName, setDeviceName] = React.useState(initialData?.device_name || '');
  const [type, setType] = React.useState<DeviceType>(initialData?.type || deviceTypes[0]);
  const [ownerId, setOwnerId] = React.useState<string>(initialData?.owner_id?.toString() || '');

  const { data: employees } = useEmployees();
  const createDevice = useCreateDevice();
  const updateDevice = useUpdateDevice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const deviceData = {
      device_name: deviceName,
      type,
      owner_id: ownerId ? parseInt(ownerId) : null,
    };

    if (initialData) {
      await updateDevice.mutateAsync({
        id: initialData.id,
        ...deviceData,
      });
    } else {
      await createDevice.mutateAsync(deviceData);
    }

    setDeviceName('');
    setType(deviceTypes[0]);
    setOwnerId('');
    onSuccess?.();
  };

  const inputClasses = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  if (inline) {
    return (
      <>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="Device Name"
          className={inputClasses}
        />
        
        <select
          value={type}
          onChange={(e) => setType(e.target.value as DeviceType)}
          className={inputClasses}
        >
          <option value="" disabled>Select Type</option>
          {deviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <select
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select Owner</option>
            {employees?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>

          <Button
            onClick={handleSubmit}
          >
            <Plus className="h-4 w-4 mr-2" />
            {initialData ? 'Save Changes' : 'Add Device'}
          </Button>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="deviceName" className="block text-sm font-medium text-foreground mb-1">
            Device Name
          </label>
          <input
            id="deviceName"
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            required
            className={inputClasses}
            placeholder="Enter device name"
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as DeviceType)}
            required
            className={inputClasses}
          >
            {deviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-foreground mb-1">
            Owner
          </label>
          <select
            id="owner"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select Owner</option>
            {employees?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createDevice.isPending || updateDevice.isPending}
        >
          {initialData 
            ? (updateDevice.isPending ? 'Saving...' : 'Save Changes')
            : (createDevice.isPending ? 'Adding...' : 'Add Device')
          }
        </Button>
      </div>
    </form>
  );
};
