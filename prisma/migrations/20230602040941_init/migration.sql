/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Game` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameAlias` (
    `id` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `GameAlias` ADD CONSTRAINT `GameAlias_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameAlias` ADD CONSTRAINT `GameAlias_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
