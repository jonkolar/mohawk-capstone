-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `team1Id` INTEGER NOT NULL,
    `team2Id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `winner` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
