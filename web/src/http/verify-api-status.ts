import { useQuery } from "react-query";

import { useRequest } from "./hooks/useRequest";
import { queryKeys } from "./request-keys";

export function useVerifyApiStatus() {
  const response = useQuery({
    queryKey: [queryKeys.verifyApiStatus],
    queryFn: () => useRequest({
      url: '/api/status',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
  })

  return response
}

