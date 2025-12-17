import useApi from 'src/composables/useApi';

export default function useService(url: string) {
  const { index } = useApi(url);

  return {
    index,
  };
}
