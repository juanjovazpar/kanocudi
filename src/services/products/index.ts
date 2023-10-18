import apiClient from '../api';

const ENDPOINT = '/products';

export const getAllProducts = (): Promise<any> => apiClient.get(`${ENDPOINT}/`);

export const createProduct = (product: any): Promise<any> =>
  apiClient.post(`${ENDPOINT}/`, product);
