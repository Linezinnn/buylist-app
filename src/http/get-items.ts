import { useQuery } from "react-query";
import { AxiosError } from "axios";

import { ItemResponseType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useConnectionErrorToast } from "@/components/toasts/connection-error";
import { useRequestErrorToast } from "@/components/toasts/request-error";

export function useGetItems() {
  const { connectionErrorToast } = useConnectionErrorToast()
  const { requestErrorToast } = useRequestErrorToast()

  const { data: itemsData, isLoading } = useQuery({
    queryKey: ['items-data'],
    queryFn: () => useRequest<ItemResponseType[]>({
      url: '/all-items',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
    onError: (error: AxiosError) => {
      if(error.code === 'ERR_NETWORK') {
        connectionErrorToast()
        return 
      }
      
      requestErrorToast()
    },
  })

  return { itemsData, isLoading }
}

