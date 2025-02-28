export const isValidSite = defineCachedFunction(async (siteId: string) => {
  console.log("here");
  const existing = await useDrizzle()
    .query
    .sites
    .findFirst({
      where: eq(tables.sites.id, siteId),
      with: {
        id: true
      }
    });

  console.log("there");

  return !!existing;
}, {
  maxAge: 60 * 60,
  name: "valid-site",
  getKey: (siteId: string) => siteId
});
