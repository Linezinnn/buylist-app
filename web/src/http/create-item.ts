import { useMutation, useQueryClient } from "react-query";

import { ItemPostType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { mutationKeys, queryKeys } from "./request-keys";

import { useCreateSucessToast } from "@/components/toasts";

interface CreateItemProps {
  data: ItemPostType
}

export function useCreateItem() {
  const { createSucessToast } = useCreateSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const createItem = useMutation({
    mutationKey: [mutationKeys.createItem],
    mutationFn: ({ data }: CreateItemProps) => useRequest({
      url: `/item`,
      method: 'post',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.itemsData]
      })

      createSucessToast()
    }
  })

  return { createItem }
}
