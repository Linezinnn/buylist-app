import { AxiosError } from "axios";
import { useMutation } from "react-query";

import { ItemCheckType, ItemGetType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useConnectionErrorToast } from "@/components/toasts/connection-error";
import { useRequestErrorToast } from "@/components/toasts/request-error";

interface CheckItemProps {
  params: ItemGetType,
  data: ItemCheckType
}

export function useCheckItem() {
  const { connectionErrorToast } = useConnectionErrorToast()
  const { requestErrorToast } = useRequestErrorToast()

  const itemCheckUpdate = useMutation({
    mutationKey: ['item-check-update'],
    mutationFn: ({ params, data }: CheckItemProps) => useRequest({
      url: `/check-item/${params.id}`,
      method: 'patch',
      data,
    }),
    onError: (error: AxiosError) => {
      if(error.code === 'ERR_NETWORK') {
        connectionErrorToast()
        return 
      }
      
      requestErrorToast()
    },
  })

  return { itemCheckUpdate }
}
