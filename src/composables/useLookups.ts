import { api } from 'boot/axios.js';
import { type OptionsSelect } from 'src/util/Interface';

export default function useLookups() {
  async function lookupSuppliers(): Promise<{ data: OptionsSelect[] }> {
    const { data } = await api.get('lookups/suppliers');
    return data;
  }
  async function lookupClients(): Promise<{ data: OptionsSelect[] }> {
    const { data } = await api.get('lookups/clients');
    return data;
  }

  return {
    lookupSuppliers,
    lookupClients,
  };
}
