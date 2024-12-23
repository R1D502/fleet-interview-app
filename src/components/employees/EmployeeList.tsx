import React from 'react';
import { useEmployees, useDeleteEmployee } from '../../hooks/useEmployees';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
  selectedRole: string;
}

export const EmployeeList = ({ onEdit, selectedRole }: EmployeeListProps) => {
  const { data: employees, isLoading } = useEmployees();
  const deleteEmployee = useDeleteEmployee();

  const filteredEmployees = React.useMemo(() => {
    if (!employees) return [];
    if (!selectedRole) return employees;
    
    return employees.filter(employee => 
      employee.role === selectedRole
    );
  }, [employees, selectedRole]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 border-b pb-4">
          <div className="text-base font-medium text-muted-foreground">Name</div>
          <div className="text-base font-medium text-muted-foreground">Role</div>
          <div className="text-base font-medium text-muted-foreground text-right">Actions</div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredEmployees.map((employee) => (
          <div 
            key={employee.id} 
            className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-4 md:px-6 py-4 hover:bg-muted/50"
          >
            <div className="text-base font-medium text-foreground flex items-center">{employee.name}</div>
            <div className="text-base text-muted-foreground flex items-center">{employee.role}</div>
            <div className="flex justify-end gap-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-base"
                onClick={() => onEdit(employee)}
              >
                <Pencil className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-base"
                onClick={() => deleteEmployee.mutate(employee.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}

        {(!filteredEmployees || filteredEmployees.length === 0) && (
          <div className="px-4 md:px-6 py-8 text-center text-base text-muted-foreground">
            {selectedRole ? 'No employees found for selected role.' : 'No employees found. Add an employee to get started.'}
          </div>
        )}
      </div>
    </div>
  );
};
