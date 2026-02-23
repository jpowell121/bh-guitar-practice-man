import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.scalePattern.upsert({
        where: { name: "Major" },
        update: {},
        create: {
            name: "Major",
            notes_grid: [
                [true, true, false, true, false],
                [false, true, false, true, false],
                [true, false, true, true, false],
                [true, false, true, true, false],
                [true, true, false, true, false],
                [true, true, false, true, false],
            ],
        },
    });

    console.log("Seeded scale patterns");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());