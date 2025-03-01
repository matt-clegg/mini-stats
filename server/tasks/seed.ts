import * as seeds from "../database/seeds";

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database"
  },
  async run() {
    console.log("Running seed task...");

    await seeds.users();
    await seeds.sites();
    await seeds.events();

    return { result: "success" };
  }
});
