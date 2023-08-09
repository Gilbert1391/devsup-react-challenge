import { Product } from '../features/products/models';

const BASE_URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

const COMMON_HEADERS = {
  contentType: 'application/json',
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
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

const put = async (data: Product): Promise<Product[]> =>
  await fetch(`${BASE_URL}`, {
    method: 'PUT',
    headers: {
      ...COMMON_HEADERS,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

const deleteProduct = async (id: string): Promise<string> =>
  await fetch(`${BASE_URL}?${id}`, {
    method: 'DELETE',
    headers: {
      ...COMMON_HEADERS,
    },
  }).then(() => id);

export default {
  getAll,
  post,
  put,
  delete: deleteProduct,
};
