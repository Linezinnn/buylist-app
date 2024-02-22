import { useToast } from "../ui/use-toast"

export function useCreateItemSucessToast() {
  const { toast } = useToast()

  const createItemSucessToast = () => toast({
    title: 'Sucesso',
    description: 'A criação do item foi concluída com êxito, e já se encontra na sua lista!',
    variant: 'sucess',
  })

  return { createItemSucessToast }
}