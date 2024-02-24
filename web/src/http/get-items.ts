import { useQuery } from "react-query";

import { ItemResponseType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { queryKeys } from "./request-keys";

export function useGetItems() {
  const { displayErrorToasts } = useOnError()

  const response = useQuery({
    queryKey: [queryKeys.itemsData],
    queryFn: () => useRequest<ItemResponseType[]>({
      url: '/all-items',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
    onError: displayErrorToasts,
  })

  return response
}

