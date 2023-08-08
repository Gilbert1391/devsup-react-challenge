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

export default {
  getAll,
};
