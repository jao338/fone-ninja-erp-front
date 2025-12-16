import { api } from 'boot/axios.js';
import { type OptionsSelect } from 'src/util/Interface';

export default function useLookups() {
  async function lookupPlantas(): Promise<{ data: OptionsSelect[] }> {
    const { data } = await api.get('lookups/plantas');
    return data;
  }

  return {
    lookupPlantas,
  };
}
