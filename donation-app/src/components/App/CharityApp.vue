<template>
  <div>
    <NavHeader userType="charity"/>
    <!-- Render selected charity view (defaults to charity/home) -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from '../NavHeader/index.vue'

export default {
  name: 'CharityApp',
  components: {
    NavHeader
  }
}
</script>

<style>
</style>