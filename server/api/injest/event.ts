import { z } from "zod";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    s: z.string(),
    u: z.string(),
    r: z.string().optional(),
    b: z.string().optional(),
    d: z.string().optional()
  }).parse);

  // const validSiteId = await isValidSite(body.s);
  // console.log("is valid site", isValidSite);
  // if (validSiteId) {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: "Invalid site"
  //   });
  // }

  const eventData = {
    site: body.s,
    url: body.u,
    referrer: body.r,
    browser: body.b,
    device: body.d,
    createdAt: new Date()
  };

  await useDrizzle()
    .insert(tables.events)
    .values(eventData);
});
