import { useMutation } from "react-query";

import { ItemCheckType, ItemGetType } from "@/types/item-types";

import { useRequest } from "./hooks/useRequest";
import { useOnError } from "./hooks/useOnError";
import { mutationKeys } from "./request-keys";

interface CheckItemProps {
  params: ItemGetType,
  data: ItemCheckType
}

export function useCheckItem() {
  const { displayErrorToasts } = useOnError()

  const itemCheckUpdate = useMutation({
    mutationKey: [mutationKeys.itemCheckUpdate],
    mutationFn: ({ params, data }: CheckItemProps) => useRequest({
      url: `/check-item/${params.id}`,
      method: 'patch',
      data,
    }),
    onError: displayErrorToasts,
  })

  return { itemCheckUpdate }
}
