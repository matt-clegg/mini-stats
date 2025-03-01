export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const sites = await useDrizzle()
    .select()
    .from(tables.sites)
    .where(eq(tables.sites.user, user.id));

  return sites ?? [];
});
