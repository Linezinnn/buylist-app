import { useState } from "react";

import { useCheckItem } from "@/http/check-item";

import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Loading } from "@/components/loading";
import { ColorDisplay } from "@/components/color-display";

interface ItemCellProps {
  name: string,
  amount: number,
  amountCategory: {
    name: string,
  },
  itemCategory: {
    name: string,
    color: string,
  },
  isChecked: boolean,
  id: string,
}

export function ItemCell({ name, amount, amountCategory, itemCategory, isChecked, id }: ItemCellProps) {
  const [ checked, setChecked ] = useState<boolean>(isChecked)
  const [ loading, setLoading ] = useState<boolean>(false)

  const { itemCheckUpdate } = useCheckItem()
  
  function handleCheckItem() {
    const updatedCheck = !checked

    setLoading(true)
    
    itemCheckUpdate.mutate({
      params: {
        id,
      },
      data: {
        isChecked: updatedCheck,
      }}, {
        onSuccess: () => {
          setChecked(updatedCheck)
          setLoading(false)
        },
        onError: () => {
          setTimeout(() => {
            setLoading(false)
          }, 200);
        }
      })
  }

  return (
    <TableRow className={checked ? 'dark:bg-[#070707] bg-[#f3f3f3]' : ''}>
      <TableCell className="line-through text-zinc-600">
        {loading ? (
          <Loading className="-mr-8"/>
        ) : (
          <Checkbox 
            checked={checked} 
            onClick={handleCheckItem} 
          />
        )}

      </TableCell>

      <TableCell className={checked ? 'line-through text-zinc-600' : ''}>
        {name}
      </TableCell>

      <TableCell className={checked ? "line-through text-zinc-600" : ''}>
        {amount} / {amountCategory.name}
      </TableCell>
      
      <TableCell 
        className={`
          flex gap-2 items-center
          ${checked ? 'line-through text-zinc-600' : ''}
        `}
      >
        <ColorDisplay 
          color={itemCategory.color} 
          className={checked ? 'opacity-50' : ''}
        />
        {itemCategory.name}
      </TableCell>
    </TableRow>
  )
}