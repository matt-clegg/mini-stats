import { faker } from "@faker-js/faker";
import * as schema from "../schema";

function weightedRandom(min: number, max: number, exponent: number = 2): number {
  const randomValue = Math.random();
  const weighted = Math.pow(randomValue, exponent);
  return Math.floor(weighted * (max - min + 1)) + min;
}

export default async function seed() {
  const users = await useDrizzle()
    .select()
    .from(schema.users);

  let count = 0;

  console.log(`Seeding sites for ${users.length} users...`);
  for (const user of users) {
    const sites = weightedRandom(1, 20, 4);

    console.log(`Generating ${sites} for user ${user.id}...`);

    for (let i = 0; i < sites; i++) {
      const name = faker.internet.domainWord();
      const suffix = faker.internet.domainSuffix();

      count++;
      await useDrizzle()
        .insert(schema.sites)
        .values({
          id: useHash(),
          user: user.id,
          name: name,
          domain: name + "." + suffix,
          createdAt: faker.date.between({ from: user.createdAt, to: new Date() })
        });
    }
  }

  console.log("Seeding complete! Created " + count + " sites.");
}
