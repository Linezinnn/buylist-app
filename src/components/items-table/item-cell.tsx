import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableRow } from "../ui/table";

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
}

export function ItemCell({ name, amount, amountCategory, itemCategory, isChecked }: ItemCellProps) {
  const [ check, setCheck ] = useState<boolean>(isChecked)
  const [ loading, setLoading ] = useState<boolean>(false)
  
  return (
    <TableRow className={check ? 'dark:bg-[#070707] bg-[#f3f3f3]' : ''}>
      <TableCell className="line-through text-zinc-600">
        {loading ? (
          <div 
            className={`
                w-4 h-4
                -mr-8
                rounded-full
                border-l-white border-gray-600 border
                animate-spin
                ease-linear
            `}
          />
        ) : (
          <Checkbox 
            checked={check} 
            onClick={() => setCheck(!check)} 
          />
        )}

      </TableCell>

      <TableCell className={check ? 'line-through text-zinc-600' : ''}>
        {name}
      </TableCell>

      <TableCell className={check ? "line-through text-zinc-600" : ''}>
        {amount} {amountCategory.name}
      </TableCell>
      
      <TableCell 
        className={`
          flex gap-2 items-center
          ${check ? 'line-through text-zinc-600' : ''}
        `}
      >
        <div 
          style={{backgroundColor: itemCategory.color}}
          className={`
            h-4 w-4 rounded-sm 
            ring-1 ring-border dark:ring-1 dark:ring-zinc-600
            ${check ? 'opacity-50' : ''}
          `}
        />
        {itemCategory.name}
      </TableCell>
    </TableRow>
  )
}