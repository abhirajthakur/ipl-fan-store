import bcrypt from "bcryptjs";
import prisma from "../db";
import { IPL_TEAMS, PRODUCTS } from "../lib/constants";

async function clearDatabase() {
  console.log("🧹 Clearing existing database records...");
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
}

async function seedProducts() {
  console.log("📦 Seeding products...");
  const createdProducts = [];

  for (const product of PRODUCTS) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
    });
    createdProducts.push(createdProduct);
  }

  console.log(`✅ Seeded ${createdProducts.length} products`);
  return createdProducts;
}

async function seedUsers(products: any[]) {
  console.log("👥 Creating test users...");
  const testUsers = [];
  const defaultPassword = "password123";

  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());

  for (const [index, team] of IPL_TEAMS.entries()) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    if (products.length === 0) {
      throw new Error("No products available to seed users' carts");
    }

    const randomProduct = shuffledProducts[index % products.length];

    const user = await prisma.user.create({
      data: {
        name: `${team.name} Fan`,
        email: `${team.id}@example.com`,
        password: hashedPassword,
        teamId: team.id,
        cart: {
          create: {
            items: {
              create: {
                productId: randomProduct.id,
                quantity: Math.floor(Math.random() * 3) + 1,
              },
            },
          },
        },
      },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    testUsers.push(user);
  }

  console.log("Test Users Created:");
  testUsers.forEach((user) => {
    console.log(`
  🏏 User Details:
    - Name: ${user.name}
    - Email: ${user.email}
    - Team: ${user.teamId}
    - Password: ${defaultPassword}
    - Cart Items: ${user.cart?.items.length || 0}`);
  });

  return testUsers;
}

async function main() {
  try {
    console.log("🚀 Starting database seeding...");

    await clearDatabase();
    const products = await seedProducts();
    await seedUsers(products);

    console.log("✨ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
