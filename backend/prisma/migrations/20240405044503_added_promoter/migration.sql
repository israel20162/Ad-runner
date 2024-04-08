-- AlterTable
ALTER TABLE `user` ADD COLUMN `userType` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Promoter` (
    `userId` INTEGER NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `contactInfo` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `profilePicture` VARCHAR(191) NULL,
    `promotionMethods` JSON NULL,
    `targetAudience` JSON NULL,
    `previousExperience` VARCHAR(191) NULL,
    `promotionLinks` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,

    UNIQUE INDEX `Promoter_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promoter` ADD CONSTRAINT `Promoter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
