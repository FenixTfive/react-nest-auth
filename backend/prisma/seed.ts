import { PrismaClient } from "@prisma/client";
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: "fenix1@example.com",
            firstName: "fenix",
            lastName: "One",
            password: await argon.hash("P4sswO0rd1"),
            nickName: "fenix1",
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: "fenix2@example.com",
            firstName: "fenix",
            lastName: "Two",
            password: await argon.hash("P4sswO0rd2"),
            nickName: "fenix2",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
