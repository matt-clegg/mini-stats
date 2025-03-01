import { z } from "zod";

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const body = await readValidatedBody(event, z.object({
    name: z.string(),
    domain: z.string()
  }).parse);

  const site = await useDrizzle()
    .insert(tables.sites)
    .values({
      user: user.id,
      name: body.name,
      domain: body.domain,
      createdAt: new Date()
    })
    .returning()
    .get();

  return site.id;
});
