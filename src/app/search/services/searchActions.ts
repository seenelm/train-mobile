import { useQuery } from 'react-query';
import { searchUsers } from './searchServices';

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchUsers(query),
    enabled: !!query.trim() // Only enable the query if query is not empty
  });
};