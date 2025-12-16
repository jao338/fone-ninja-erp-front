<template>
  <q-img
    src="~src/assets/images/crm_logo_blue.png"
    :class="{
      'logo-login-sm': $q.screen.lt.md,
      'logo-login-lg': $q.screen.gt.sm,
    }"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'LogoLogin',
});
</script>

<style scoped>
.logo-login-sm {
  width: 180px;
}
.logo-login-lg {
  width: 250px;
}
</style>
