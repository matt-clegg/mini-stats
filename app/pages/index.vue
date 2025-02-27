<script setup lang="ts">
const { user, clear, loggedIn } = useUserSession();
</script>

<template>
  <div>
    hello world

    <NuxtLink
      to="/auth/github"
      external
    >
      Login with GitHub
    </NuxtLink>

    <button @click="clear">
      Logout
    </button>

    <template v-if="loggedIn && user">
      <img :src="user.avatarUrl" alt="avatar">
    </template>
    <pre>{{ user }}</pre>
  </div>
</template>

<style scoped>

</style>
