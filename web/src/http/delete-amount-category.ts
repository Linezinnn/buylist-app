import { useMutation, useQueryClient } from "react-query";

import { AmountCategoryDeleteOptionsType, AmountCategoryGetType } from "@/types/amount-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";

import { mutationKeys, queryKeys } from "./request-keys";
import { useCreateSucessToast } from "@/components/toasts";

interface DeleteAmountCategoryProps {
  params: AmountCategoryGetType,
  data: AmountCategoryDeleteOptionsType,
}

export function useDeleteAmountCategory() {
  const { createSucessToast } = useCreateSucessToast()
  const { displayErrorToasts } = useOnError()
  
  const queryClient = useQueryClient()

  const deleteAmountCategory = useMutation({
    mutationKey: [mutationKeys.deleteAmountCategory],
    mutationFn: ({ params, data }: DeleteAmountCategoryProps) => useRequest({
      url: `/amount-category/${params.id}`,
      method: 'delete',
      data,
    }),
    onError: displayErrorToasts,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [queryKeys.amountCategoriesData]
      })

      createSucessToast()
    }
  })

  return { deleteAmountCategory }
}
