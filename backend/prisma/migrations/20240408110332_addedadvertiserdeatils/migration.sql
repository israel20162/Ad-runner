/*
  Warnings:

  - You are about to drop the column `email` on the `advertiser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyEmail]` on the table `Advertiser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyEmail` to the `Advertiser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Advertiser_email_key` ON `advertiser`;

-- AlterTable
ALTER TABLE `advertiser` DROP COLUMN `email`,
    ADD COLUMN `balance` INTEGER NULL,
    ADD COLUMN `business_type` VARCHAR(191) NULL,
    ADD COLUMN `companyEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyWebsite` VARCHAR(191) NULL,
    ADD COLUMN `contact` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `promoter` ADD COLUMN `earnings` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Advertiser_companyEmail_key` ON `Advertiser`(`companyEmail`);
