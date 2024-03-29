export interface IAmountCategoryRoutes {
   createAmountCategory(prefix: string): void
   getAllAmountCategories(prefix: string): void
   deleteAmountCategory(prefix: string): void
}

export interface IItemCategoryRoutes {
   createItemCategory(prefix: string): void
   getAllItemCategories(prefix: string): void
   deleteItemCategory(prefix: string): void
   getItemCategoryById(prefix: string): void
}

export interface IItemRoutes {
   createItem(prefix: string): void
   getItemById(prefix: string): void
   getAllItems(prefix: string): void
   deleteItem(prefix: string): void
   checkItem(prefix: string): void
}

export interface IInfoRoutes {
   status(prefix: string): void
}