import { json } from 'react-router-dom';
import { Product } from '../features/products/models';

const BASE_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

const COMMON_HEADERS = {
  authorId: '1',
};

const getAll = async (): Promise<Product[]> =>
  await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      ...COMMON_HEADERS,
    },
  }).then((response) => response.json());

const post = async (data: Product): Promise<Product[]> =>
  await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      ...COMMON_HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

const put = async (data: Product): Promise<Product> =>
  await fetch(`${BASE_URL}`, {
    method: 'PUT',
    headers: {
      ...COMMON_HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

const deleteProduct = async (id: string): Promise<string> =>
  await fetch(`${BASE_URL}?id=${id}`, {
    method: 'DELETE',
    headers: {
      ...COMMON_HEADERS,
    },
  }).then(() => id);

const validateId = async (id: string): Promise<boolean> =>
  await fetch(`${BASE_URL}/verification?id=${id}`, {
    method: 'GET',
    headers: {
      ...COMMON_HEADERS,
    },
  }).then((response: Response) => response.ok);

export default {
  getAll,
  post,
  put,
  delete: deleteProduct,
  validateId,
};
