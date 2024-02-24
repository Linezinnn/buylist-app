import { useQuery } from "react-query";

import { ItemCategoryResponseType } from "@/types/item-category-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { queryKeys } from "./request-keys";

export function useGetItemCategories() {
  const { displayErrorToasts } = useOnError()

  const response = useQuery({
    queryKey: [queryKeys.itemCategoriesData],
    queryFn: () => useRequest<ItemCategoryResponseType[]>({
      url: '/all-item-categories',
      method: 'get', 
    }),
    refetchOnWindowFocus: false,
    onError: displayErrorToasts,
  })

  return response
}

