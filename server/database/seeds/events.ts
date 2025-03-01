import { faker } from "@faker-js/faker";
import * as schema from "../schema";

export default async function seed() {
  const sites = await useDrizzle()
    .select()
    .from(schema.sites);

  console.log("Seeding events for sites...");
  let count = 0;

  for (const site of sites) {
    const eventsToGenerate = Math.floor(Math.random() * 100) + 1;

    console.log(`Creating ${eventsToGenerate} events for site ${site.id}`);

    for (let i = 0; i < eventsToGenerate; i++) {
      await useDrizzle()
        .insert(schema.events)
        .values({
          site: site.id,
          url: faker.internet.url(),
          referrer: faker.internet.url(),
          browser: Math.random() < 0.5 ? "Chrome" : Math.random() < 0.5 ? "Firefox" : "Safari",
          device: Math.random() < 0.5 ? "Mobile" : Math.random() < 0.5 ? "Tablet" : "Desktop",
          createdAt: faker.date.between({ from: site.createdAt, to: new Date() })
        });
      count++;
    }

    console.log("Done!");
  }
  console.log("Seeding complete! Generated " + count + " events.");
}
