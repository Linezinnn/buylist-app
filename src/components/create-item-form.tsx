import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"

export function CreateItemForm() {
  const createItemFormSchema = z.object({
    item_name: z.string()
      .min(1, 'O nome do item é obrigatório')
      .min(3, 'O nome precisa ter pelo menos 3 caracteres')
      .trim(),
    item_amount: z.coerce.number()
      .min(1, 'A quantidade precisa ser maior que 0')
      .max(100000, 'A quantidade precisa ser menor que 100.000'),
    item_amount_category: z.string()
      .min(1, 'A categoria da quantidade é obrigatória'),
    item_category: z.string()
      .min(1, 'A categoria do item é obrigatório')
      .refine(category => {
        return category !== ''
      }, 'A categoria é obrigatória')
    ,
  })
    
  type CreateItemFormData = z.infer<typeof createItemFormSchema>
 
  const createItemForm = useForm<CreateItemFormData>({
    resolver: zodResolver(createItemFormSchema),
    defaultValues: {
      item_name: '',
      item_amount: 0,
      item_amount_category: 'un',
      item_category: ''
    }
  })

  function handleSubmit(data:CreateItemFormData ) {
    console.log(data)
  }

  return (
    <Form {...createItemForm}>
        <form onSubmit={createItemForm.handleSubmit(handleSubmit)} className="flex flex-col gap-3 md:grid md:grid-cols-8 md:gap-2">
          <FormField 
            control={createItemForm.control}
            name="item_name"
            render={({field}) => (
              <FormItem className="col-span-3">
                <FormControl>
                  <Input 
                    placeholder="Nome do item" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex-col col-span-2 gap-2 space-y-2">
            <div className="flex gap-0.5">
              <FormField 
                control={createItemForm.control}
                name="item_amount"
                render={({field}) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input 
                        type="number"
                        className="rounded-r-none "
                        placeholder="Quantidade" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={createItemForm.control}
                name="item_amount_category"
                render={({field}) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-l-none">
                          <SelectValue placeholder="Unidade" />
                        </SelectTrigger>
                      </FormControl>
                        <SelectContent>
                          <SelectItem value="un">Unidade</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField 
            control={createItemForm.control}
            name="item_category"
            render={({field}) => (
              <FormItem className="col-span-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="$create$">
                      <Plus size={4} />
                      Criar categoria
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            />
            <Button className="px-3">Criar</Button>
        </form>
      </Form>
  )
}