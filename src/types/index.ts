export interface Employee {
  id: number;
  name: string;
  role: string;
  created_at: string;
}

export interface Device {
  id: number;
  device_name: string;
  type: string;
  owner_id: number | null;
  created_at: string;
}

export type DeviceType = 'Laptop' | 'Display' | 'Peripheral';

export interface CreateDevicePayload {
  device_name: string;
  type: DeviceType;
  owner_id?: number | null;
}
