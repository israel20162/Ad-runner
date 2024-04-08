/*
  Warnings:

  - Added the required column `id` to the `Promoter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promoter` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Advertiser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `companyName` VARCHAR(191) NULL,
    `advertiserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Advertiser_userId_key`(`userId`),
    UNIQUE INDEX `Advertiser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('Draft', 'Active', 'Completed', 'Paused', 'Cancelled') NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `clickUrl` VARCHAR(191) NULL,
    `promoterLimit` INTEGER NULL,
    `filters` JSON NULL,
    `platform` JSON NULL,
    `creatorId` INTEGER NOT NULL,
    `impressions` INTEGER NULL,
    `clicks` INTEGER NULL,
    `conversions` INTEGER NULL,
    `views` INTEGER NULL,
    `likes` INTEGER NULL,
    `earnings` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Campaign_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CampaignToPromoter` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CampaignToPromoter_AB_unique`(`A`, `B`),
    INDEX `_CampaignToPromoter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Advertiser` ADD CONSTRAINT `Advertiser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Advertiser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampaignToPromoter` ADD CONSTRAINT `_CampaignToPromoter_A_fkey` FOREIGN KEY (`A`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampaignToPromoter` ADD CONSTRAINT `_CampaignToPromoter_B_fkey` FOREIGN KEY (`B`) REFERENCES `Promoter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
