import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table"
import { ItemCell } from "./item-cell"

const mock = [
  {
    name: 'SABÃO EM PÓ',
    amount: 2,
    amountCategory: {
      name: 'Unidades',
    },
    itemCategory: {
      name: 'Limpeza',
      color: '#ffffff',
    },
    isChecked: false,
    id: 'algum_id_ai'
  },
  {
    name: 'PÃO',
    amount: 1,
    amountCategory: {
      name: 'Quilograma',
    },
    itemCategory: {
      name: 'Padaria',
      color: 'yellow',
    },
    isChecked: true,
    id: 'algum_id_ai'
  },
  {
    name: 'PÃO',
    amount: 1,
    amountCategory: {
      name: 'Quilograma',
    },
    itemCategory: {
      name: 'Padaria',
      color: 'black',
    },
    isChecked: true,
    id: 'algum_id_ai'
  }
]


export function ItemsTable() {
  return (
    <div className="rounded-lg p-2 border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1"></TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Categoria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            mock.map(item => (
              <ItemCell 
                name={item.name}
                amount={item.amount}
                amountCategory={item.amountCategory}
                itemCategory={item.itemCategory}
                isChecked={item.isChecked}
                key={item.id}
              />
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}