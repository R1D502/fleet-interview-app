import React from 'react';
import { useCreateEmployee, useUpdateEmployee } from '../../hooks/useEmployees';
import { Button } from '../ui/button';
import { Employee, EmployeeRole } from '../../types';

interface EmployeeFormProps {
  onSuccess?: () => void;
  initialData?: Employee;
}

const employeeRoles: EmployeeRole[] = ['Developer', 'Designer', 'Manager', 'Product Owner'];

export const EmployeeForm = ({ onSuccess, initialData }: EmployeeFormProps) => {
  const [name, setName] = React.useState(initialData?.name || '');
  const [role, setRole] = React.useState<EmployeeRole>(initialData?.role || employeeRoles[0]);

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const employeeData = {
      name,
      role,
    };

    if (initialData) {
      await updateEmployee.mutateAsync({
        id: initialData.id,
        ...employeeData,
      });
    } else {
      await createEmployee.mutateAsync(employeeData);
    }

    setName('');
    setRole(employeeRoles[0]);
    onSuccess?.();
  };

  const inputClasses = "h-12 w-full rounded-md border border-input bg-background px-4 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="block text-base font-medium text-foreground mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClasses}
            placeholder="Enter employee name"
          />
        </div>
        
        <div>
          <label htmlFor="role" className="block text-base font-medium text-foreground mb-2">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as EmployeeRole)}
            required
            className={inputClasses}
          >
            {employeeRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="text-base px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={createEmployee.isPending || updateEmployee.isPending}
          className="text-base px-6"
        >
          {initialData 
            ? (updateEmployee.isPending ? 'Saving...' : 'Save Changes')
            : (createEmployee.isPending ? 'Adding...' : 'Add Employee')
          }
        </Button>
      </div>
    </form>
  );
};
