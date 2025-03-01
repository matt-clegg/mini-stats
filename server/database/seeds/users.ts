import { faker } from "@faker-js/faker";
import * as schema from "../schema";

export default async function seed() {
  const userCount = 250;

  console.log(`Seeding ${userCount} users...`);

  for (let i = 0; i < userCount; i++) {
    await useDrizzle()
      .insert(schema.users)
      .values({
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        login: faker.person.firstName(),
        name: faker.person.lastName(),
        avatarUrl: faker.image.avatar(),
        createdAt: faker.date.past({ years: 3 })
      });
  }

  console.log("Seeding complete!");
}
