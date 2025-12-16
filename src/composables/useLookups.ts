import { api } from 'boot/axios.js';
import { type OptionsSelect } from 'src/util/Interface';

export default function useLookups() {
  async function lookupSuppliers(): Promise<{ data: OptionsSelect[] }> {
    const { data } = await api.get('lookups/suppliers');
    return data;
  }
  async function lookupProducts(): Promise<{ data: OptionsSelect[] }> {
    const { data } = await api.get('lookups/products');
    return data;
  }

  return {
    lookupSuppliers,
    lookupProducts,
  };
}
