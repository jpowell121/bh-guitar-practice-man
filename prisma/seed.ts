import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.scalePattern.upsert({
        where: { name: "Major" },
        update: {},
        create: {
            name: "Major",
            notes_grid: [
                [true, true, false, true, false],   // string 6 (low E)
                [true, true, false, true, false],   // string 5
                [true, false, true, true, false],   // string 4
                [true, false, true, true, false],   // string 3
                [false, true, false, true, false],  // string 2
                [true, true, false, true, false],   // string 1 (high e)
            ]
        },
    });

    console.log("Seeded scale patterns");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());