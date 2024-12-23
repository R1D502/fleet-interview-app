export type DeviceType = 'Laptop' | 'Display' | 'Peripheral';
export type EmployeeRole = 'Developer' | 'Designer' | 'Manager' | 'Product Owner';

export interface Device {
  id: number;
  device_name: string;
  type: DeviceType;
  owner_id: number | null;
}

export interface CreateDevicePayload {
  device_name: string;
  type: DeviceType;
  owner_id: number | null;
}

export interface Employee {
  id: number;
  name: string;
  role: EmployeeRole;
}

export interface CreateEmployeePayload {
  name: string;
  role: EmployeeRole;
}
