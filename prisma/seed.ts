import { PRODUCTS, IPL_TEAMS } from '../lib/constants';
import bcrypt from 'bcryptjs';
import prisma from "../db";

async function main() {
    // Seed products
    await Promise.all(
        PRODUCTS.map(async (product) => {
            return prisma.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                },
            });
        })
    );

    // Create test users with carts for each team
    const testUsers = await Promise.all(
        IPL_TEAMS.map(async (team) => {
            const hashedPassword = await bcrypt.hash('password123', 10);
            return prisma.user.create({
                data: {
                    name: `${team.name} Fan`,
                    email: `${team.id}@example.com`,
                    password: hashedPassword,
                    teamId: team.id,
                },
            });
        })
    );

    console.log('Created test users:');
    testUsers.forEach((user) => {
        console.log(`- Email: ${user.email}, Password: password123, Team: ${user.teamId}`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default main;