import useApi from 'src/composables/useApi';

export default function ExampleService(url: string) {
  const { index, create, show, update, destroy } = useApi(url);

  return {
    create,
    index,
    update,
    show,
    destroy,
  };
}
