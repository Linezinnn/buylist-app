-- CreateTable
CREATE TABLE `Item` (
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `isChecked` BOOLEAN NOT NULL,
    `amountCategoryId` VARCHAR(191) NOT NULL,
    `itemCategoryId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Item_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_amountCategoryId_fkey` FOREIGN KEY (`amountCategoryId`) REFERENCES `AmountCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_itemCategoryId_fkey` FOREIGN KEY (`itemCategoryId`) REFERENCES `ItemCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
