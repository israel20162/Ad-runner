-- AlterTable
ALTER TABLE `advertiser` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `profilePicture` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;
