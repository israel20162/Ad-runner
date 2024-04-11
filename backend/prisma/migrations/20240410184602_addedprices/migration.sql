-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `pricesPerMetric` JSON NULL,
    ADD COLUMN `pricesPerPlatform` JSON NULL;
