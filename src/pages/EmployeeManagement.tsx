import React from 'react';
import { EmployeeList } from '../components/employees/EmployeeList';
import { EmployeeForm } from '../components/employees/EmployeeForm';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Employee, EmployeeRole } from '../types';

const employeeRoles: EmployeeRole[] = ['Developer', 'Designer', 'Manager', 'Product Owner'];

export const EmployeeManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);
  const [selectedRole, setSelectedRole] = React.useState('');

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const inputClasses = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm 
              onSuccess={handleClose}
              initialData={editingEmployee || undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm border">
        <div className="p-4 md:p-6 border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-base font-medium text-muted-foreground whitespace-nowrap">
              Filter by Role:
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className={inputClasses + " w-full md:w-64"}
            >
              <option value="">All Employees</option>
              {employeeRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        <EmployeeList 
          onEdit={handleEdit}
          selectedRole={selectedRole}
        />
      </div>
    </div>
  );
};
