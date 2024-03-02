import { useMutation, useQueryClient } from "react-query";

import { ItemCategoryDeleteOptionsType, ItemCategoryGetType } from "@/types/item-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";

import { mutationKeys, queryKeys } from "./request-keys";
import { useCreateSucessToast } from "@/components/toasts";

interface DeleteItemCategoryProps {
  params: ItemCategoryGetType,
  data: ItemCategoryDeleteOptionsType,
}

export function useDeleteItemCategory() {
  const { createSucessToast } = useCreateSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const deleteItemCategory = useMutation({
    mutationKey: [mutationKeys.deleteItemCategory],
    mutationFn: ({ params, data }: DeleteItemCategoryProps) => useRequest({
      url: `/item-category/${params.id}`,
      method: 'delete',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.itemCategoriesData]
      })

      createSucessToast()
    }
  })

  return { deleteItemCategory }
}
