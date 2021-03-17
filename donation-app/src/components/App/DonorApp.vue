<template>
  <div>
    <NavHeader userType="donor"/>
    <!-- Render selected donor view (defaults to donor/home) -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from '../NavHeader/index.vue'

export default {
  name: 'DonorApp',
  components: {
    NavHeader
  }
}
</script>

<style>
</style>