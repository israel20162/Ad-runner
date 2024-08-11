-- DropForeignKey
ALTER TABLE `campaign` DROP FOREIGN KEY `Campaign_creatorId_fkey`;

-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `targetAudience` JSON NULL;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Advertiser`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
