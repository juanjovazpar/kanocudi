import apiClient from '../api';

const ENDPOINT = '/products';

export const getProduct = (id: string): Promise<any> =>
  apiClient.get(`${ENDPOINT}/${id}`);

export const deleteProduct = (id: string): Promise<any> =>
  apiClient.delete(`${ENDPOINT}/${id}`);

export const putProduct = (product: any): Promise<any> =>
  apiClient.put(`${ENDPOINT}/${product.id}`, product);

export const getProductResults = (id: string): Promise<any> =>
  apiClient.get(`${ENDPOINT}/${id}/results`);

export const sendProductInvitations = (id: string): Promise<any> =>
  apiClient.get(`${ENDPOINT}/${id}/send`);
