export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user }) {
    const existingUser = await useDrizzle()
      .insert(tables.users)
      .values({
        id: user.id,
        login: user.login,
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
        createdAt: new Date()
      })
      .onConflictDoUpdate({
        target: tables.users.id,
        set: {
          name: user.name || user.login,
          avatarUrl: user.avatar_url
        }
      })
      .returning()
      .get();

    await setUserSession(event, { user: existingUser });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Github OAuth error", error);
    return sendRedirect(event, "/");
  }
});
