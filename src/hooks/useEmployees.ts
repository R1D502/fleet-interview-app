import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Employee, CreateEmployeePayload } from '../types';

export const useEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data } = await api.get('/employees');
      return data;
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (employee: CreateEmployeePayload) => {
      const { data } = await api.post('/employees', employee);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...employee }: CreateEmployeePayload & { id: number }) => {
      const { data } = await api.put(`/employees/${id}`, employee);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/employees/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
