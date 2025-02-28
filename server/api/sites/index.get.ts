export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  return useDrizzle()
    .select()
    .from(tables.sites)
    .where(eq(tables.sites.userId, user.id))
    .get();
});
