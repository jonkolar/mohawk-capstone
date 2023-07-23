-- CreateTable
CREATE TABLE `MatchChallenge` (
    `id` VARCHAR(191) NOT NULL,
    `senderTeamId` INTEGER NOT NULL,
    `receiverTeamId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MatchChallenge` ADD CONSTRAINT `MatchChallenge_senderTeamId_fkey` FOREIGN KEY (`senderTeamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchChallenge` ADD CONSTRAINT `MatchChallenge_receiverTeamId_fkey` FOREIGN KEY (`receiverTeamId`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
