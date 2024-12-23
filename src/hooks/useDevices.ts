import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Device, CreateDevicePayload } from '../types';

export const useDevices = () => {
  return useQuery<Device[]>({
    queryKey: ['devices'],
    queryFn: async () => {
      const { data } = await api.get('/devices');
      return data;
    },
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (device: CreateDevicePayload) => {
      const { data } = await api.post('/devices', device);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/devices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...device }: CreateDevicePayload & { id: number }) => {
      const { data } = await api.put(`/devices/${id}`, device);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};
