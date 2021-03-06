import { fetcher } from 'actions';
import useSWR from 'swr';

// export const useGetUser = () => {
//   const { data, error, ...rest} = useSWR('/api/v1/me', fetcher);
//   return { data, error, loading: !data && !error, ...rest};
// }

export const useGetUser = () => {
  const { data, error, ...rest} = useSWR('/api/v1/me', (url) => fetcher(url, {cache: "no-cache"}));
  return { data, error, loading: !data && !error, ...rest};
}