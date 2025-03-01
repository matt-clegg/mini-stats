<script setup lang="ts">
const { user, clear, loggedIn } = useUserSession();

const { data: sites, refresh: refreshSites } = await useFetch("/api/sites");

const siteName = ref();
const siteDomain = ref();

async function createSite() {
  try {
    await $fetch("/api/sites", {
      method: "POST",
      body: {
        name: siteName.value,
        domain: siteDomain.value
      }
    });
    await refreshSites();
    siteName.value = null;
    siteDomain.value = null;
  }
  catch (err) {
    console.error("Error creating site:", err);
  }
}

async function submitEvent() {
  try {
    await $fetch("/api/ingest/event", {
      method: "POST",
      body: {
        s: sites.value[0].id,
        u: "/foo/bar",
        r: "www.google.com",
        b: "Chrome",
        d: "Mobile"
      }
    });
  }
  catch (err) {
    console.error("Error submitting event:", err);
  }
}
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

    <template v-if="loggedIn && user">
      <button @click="clear">
        Logout
      </button>
      <pre>{{ user }}</pre>

      <div>
        <h2>Site</h2>
        <form @submit.prevent="createSite">
          <input v-model="siteName" placeholder="Site name">
          <input v-model="siteDomain" placeholder="Site domain">
          <button type="submit">
            Create site
          </button>
        </form>

        <div>
          <strong>sites</strong>
          <pre>
          {{ sites }}
        </pre>
        </div>
      </div>

      <div>
        <h2>Event</h2>
        <button @click="submitEvent">
          Submit event
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
